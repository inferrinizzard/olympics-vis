"use server";
import NextImage, {
	type ImageProps as NextImageProps,
	getImageProps,
} from "next/image";

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
		return [`/images/country/shared/${sharedFlag}`];
	}
	return [`/images/country/${code}.svg`, `/images/country/${code}.avif`]; // TODO: handle avif
};

const useGamesImageSrc = (code: GamesKey) => {
	return [
		`/images/games/${code}/emblem.svg`,
		`/images/games/${code}/emblem.avif`,
	]; // TODO: handle avif
};

const useSportsImageSrc = (code: SportKey, games?: GamesKey) => {
	if (games) {
		return [`/images/games/${games}/sports/${code}.avif`]; // TODO: handle fallback
	}

	return [`/images/sports/official/${code}.svg`, `/images/sports/${code}.svg`];
};

export const Image = ({ dir, code, fallback, ...props }: ImageProps) => {
	const src = (() => {
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
		return [];
	})();

	return <BaseImage srcs={src} {...props} />;
};

interface BaseImageProps extends Omit<NextImageProps, "src"> {
	srcs: string[];
}

const BaseImage = ({ srcs, ...props }: BaseImageProps) => {
	const imagePropsList = srcs.map((src) => getImageProps({ src, ...props }));

	const srcSets = imagePropsList.map((imgProps) => imgProps.props.srcSet);

	const {
		props: { srcSet, ...rest },
	} = imagePropsList.at(-1)!;

	return (
		<picture>
			{srcSets.map((srcSet, i) => (
				<source key={i} srcSet={srcSet} />
			))}
			<img alt={props.alt} {...rest} />
		</picture>
	);
};
