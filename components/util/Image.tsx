"use server";
import { existsSync } from "node:fs";

import NextImage, { type ImageProps as NextImageProps } from "next/image";

import type { CountryKey, GamesKey, SportKey } from "types/prisma";

import sharedFlags from "public/images/country/shared/sharedFlags.json";

type CountryImageProps = { dir: "country"; code: CountryKey };
type GamesImageProps = { dir: "games"; code: GamesKey };
type SportsImageProps = { dir: "sports"; code: SportKey; games?: GamesKey };

interface FallbackImageProps extends Omit<NextImageProps, "src"> {}

type ImageProps = (CountryImageProps | GamesImageProps | SportsImageProps) &
	FallbackImageProps;

const useCountryImageSrc = (code: CountryKey) => {
	if (code in sharedFlags) {
		const sharedFlag = sharedFlags[code as keyof typeof sharedFlags];
		return `/images/country/shared/${sharedFlag}`;
	}

	return ["svg", "avif", "png"]
		.map((ext) => `/images/country/${code}.${ext}`)
		.find((path) => existsSync(`public/${path}`));
};

const useGamesImageSrc = (code: GamesKey) => {
	return ["svg", "avif", "png"]
		.map((ext) => `/images/games/${code}/emblem.${ext}`)
		.find((path) => existsSync(`public/${path}`));
};

const useSportsImageSrc = (code: SportKey, games?: GamesKey) => {
	const paths = [];

	if (games) {
		paths.push(`/images/games/${games}/sports/${code}.avif`);
	}

	paths.push(
		`/images/sports/official/${code}.svg`,
		`/images/sports/${code}.svg`,
	);

	return paths.find((path) => existsSync(`public/${path}`));
};

export const Image = ({ dir, code, ...props }: ImageProps) => {
	const src =
		(() => {
			if (dir === "country") {
				return useCountryImageSrc(code);
			}
			if (dir === "games") {
				useGamesImageSrc(code);
			}
			if (dir === "sports") {
				return useSportsImageSrc(
					code,
					(props as Omit<SportsImageProps, "dir" | "code">).games,
				);
			}
			return "";
		})() ?? "";

	return <NextImage {...props} src={src} unoptimized={src.endsWith(".svg")} />;
};
