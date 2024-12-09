"use server";

import NextImage, { type ImageProps as NextImageProps } from "next/image";

import type { CountryKey, GamesKey, Sport, SportKey } from "types/prisma";

import imageMap from "./imageMap.json";
import { buildImageMapKey } from "../../lib/utils/getImageSrc";

export type CountryImageProps = { dir: "country"; code: CountryKey };
export type GamesImageProps = { dir: "games"; code: GamesKey };
export type SportsImageProps = {
	dir: "sports";
	code: SportKey;
	games?: GamesKey;
};

interface FallbackImageProps extends Omit<NextImageProps, "src"> {}

export type ImageProps = (
	| CountryImageProps
	| GamesImageProps
	| SportsImageProps
) &
	FallbackImageProps;

export const Image = async ({ dir, code, ...props }: ImageProps) => {
	const mapKey = buildImageMapKey(
		dir,
		code,
		"games" in props ? props.games : undefined,
	);

	const src = imageMap[mapKey as keyof typeof imageMap] ?? "";

	return <NextImage {...props} src={src} unoptimized={src.endsWith(".svg")} />;
};
