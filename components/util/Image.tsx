"use server";

import { existsSync } from "node:fs";

import NextImage, { type ImageProps as NextImageProps } from "next/image";

import type { CountryKey, GamesKey, SportKey } from "types/prisma";

import sharedFlags from "public/images/country/shared/sharedFlags.json";
import parentDisciplineMap from "public/images/sports/parentDisciplineMap.json";

export type CountryImageProps = { dir: "country"; code: CountryKey };
export type GamesImageProps = { dir: "games"; code: GamesKey };
export type SportsImageProps = {
	dir: "sports";
	code: SportKey;
	parent?: SportKey;
	games?: GamesKey;
};

interface FallbackImageProps extends Omit<NextImageProps, "src"> {}

export type ImageProps = (
	| CountryImageProps
	| GamesImageProps
	| SportsImageProps
) &
	FallbackImageProps;

const imageMap: Record<string, string> = {};

// TODO: add final fallbacks and remove png
export const getCountryImageSrc = async (code: CountryKey) => {
	const mapKey = `country:${code}`;

	if (mapKey in imageMap) {
		return imageMap[mapKey];
	}

	if (code in sharedFlags) {
		const sharedFlag = sharedFlags[code as keyof typeof sharedFlags];
		return `/images/country/shared/${sharedFlag}`;
	}

	const match = ["svg", "avif", "png"]
		.map((ext) => `/images/country/${code}.${ext}`)
		.find((path) => existsSync(`public/${path}`));

	if (match) {
		imageMap[mapKey] = match;
	}

	return match;
};

export const getGamesImageSrc = async (code: GamesKey) => {
	const mapKey = `games:${code}`;

	if (mapKey in imageMap) {
		return imageMap[mapKey];
	}

	const match = ["svg", "avif", "png", "jpg"]
		.map((ext) => `/images/games/${code}/emblem.${ext}`)
		.find((path) => existsSync(`public/${path}`));

	if (match) {
		imageMap[mapKey] = match;
	}

	return match;
};

export const getSportsImageSrc = async (
	code: SportKey,
	parent?: SportKey,
	games?: GamesKey,
): Promise<string | undefined> => {
	const mapKey = `sport:${[code, games].join("+")}`;

	if (mapKey in imageMap) {
		return imageMap[mapKey];
	}

	const paths = [];

	if (games) {
		// paths.push(`/images/games/${games}/sports/${code}.avif`);
		paths.push(`/images/games/${games}/sports/${code}.png`);
	}

	paths.push(
		`/images/sports/official/${code}.svg`,
		`/images/sports/official/${code}.avif`,
		`/images/sports/${code}.svg`,
		`/images/sports/${code}.avif`,
	);

	if (parent) {
		const parentPath = await getSportsImageSrc(parent, undefined, games);
		if (parentPath) {
			paths.push(parentPath);
		}
	}

	if (code in parentDisciplineMap) {
		const disciplines =
			parentDisciplineMap[code as keyof typeof parentDisciplineMap];
		const validPaths = await Promise.all(
			disciplines.flatMap((d) => getSportsImageSrc(d) ?? []),
		);
		paths.push(...validPaths);
	}

	const match = paths.find((path) => existsSync(`public/${path}`));

	if (match) {
		imageMap[mapKey] = match;
	}

	return match;
};

export const Image = async ({ dir, code, ...props }: ImageProps) => {
	const srcGetter = async () => {
		if (dir === "country") {
			return (await getCountryImageSrc(code)) ?? "";
		}
		if (dir === "games") {
			return (await getGamesImageSrc(code)) ?? "";
		}
		if (dir === "sports") {
			return await (getSportsImageSrc(
				code,
				(props as Omit<SportsImageProps, "dir" | "code">).parent,
				(props as Omit<SportsImageProps, "dir" | "code">).games,
			) ?? "");
		}
		return "";
	};

	const src =
		(await srcGetter()) ||
		(code.startsWith("P-")
			? "/images/country/shared/Paralympic_flag.svg"
			: "/images/country/shared/Olympic_flag.svg");

	return <NextImage {...props} src={src} unoptimized={src.endsWith(".svg")} />;
};
