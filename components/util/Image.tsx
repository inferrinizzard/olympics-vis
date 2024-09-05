import { useState } from "react";
import NextImage, { type ImageProps as NextImageProps } from "next/image";

import type { CountryKey, GamesKey, SportKey } from "types/prisma";

import sharedFlags from "public/images/country/shared/sharedFlags.json";

type CountryImageProps = { dir: "country"; code: CountryKey };
type GamesImageProps = { dir: "games"; code: GamesKey };
type SportsImageProps = { dir: "sports"; code: SportKey; games?: GamesKey };

interface FallbackImageProps extends Omit<NextImageProps, "src"> {
	fallback?: string;
}

type ImageProps = (CountryImageProps | GamesImageProps | SportsImageProps) &
	FallbackImageProps;

const useCountryImageSrc = (code: CountryKey) => {
	if (code in sharedFlags) {
		const sharedFlag = sharedFlags[code as keyof typeof sharedFlags];
		return `/images/country/shared/${sharedFlag}`;
	}
	return `/images/country/${code}.svg`; // TODO: handle avif
};

const useGamesImageSrc = (code: GamesKey) => {
	return `/images/games/${code}/emblem.svg`; // TODO: handle avif
};

const useSportsImageSrc = (code: SportKey, games?: GamesKey) => {
	if (games) {
		return `/images/games/${games}/sports/${code}.avif`; // TODO: handle fallback
	}

	if (true) {
		return `/images/sports/official/${code}.svg`;
	}

	return `/images/sports/${code}.svg`;
};

export const Image = ({ dir, code, fallback, ...props }: ImageProps) => {
	const src =
		dir === "country"
			? useCountryImageSrc(code)
			: dir === "games"
				? useGamesImageSrc(code)
				: dir === "sports"
					? useSportsImageSrc(
							code,
							(props as Omit<SportsImageProps, "dir" | "code">).games,
						)
					: "";

	return (
		<NextImage
			{...props}
			src={src}
			// onError={() => setImgSrc(fallback ?? src)}
		/>
	);
};
