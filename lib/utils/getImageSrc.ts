import { existsSync } from "node:fs";

import type { CountryKey, GamesKey, Sport, SportKey } from "types/prisma";

import sharedFlags from "public/images/country/shared/sharedFlags.json";
import parentDisciplineMap from "public/images/sports/parentDisciplineMap.json";

export const buildImageMapKey = (
	dir: string,
	code: string,
	...extra: (string | undefined)[]
) => `${dir}:${[code, ...extra.filter((x) => x)].join("+")}`;

export const getCountryImageSrc = (code: CountryKey) => {
	if (code in sharedFlags) {
		const sharedFlag = sharedFlags[code as keyof typeof sharedFlags];
		return `/images/country/shared/${sharedFlag}`;
	}

	const match = ["svg", "avif"]
		.map((ext) => `/images/country/${code}.${ext}`)
		.find((path) => existsSync(`public/${path}`));

	return match;
};

export const getGamesImageSrc = (code: GamesKey) => {
	const match = ["svg", "avif"]
		.map((ext) => `/images/games/${code}/emblem.${ext}`)
		.find((path) => existsSync(`public/${path}`));

	return match;
};

export const getSportsImageSrc = (
	code: SportKey,
	parent?: Sport["parent"],
	games?: GamesKey,
): string | undefined => {
	const paths = [];

	if (games) {
		paths.push(
			`/images/games/${games}/sports/${code}.svg`,
			`/images/games/${games}/sports/${code}.avif`,
		);
	}

	if (parent) {
		const parentPath = getSportsImageSrc(parent, undefined, games);
		if (parentPath) {
			paths.push(parentPath);
		}
	}

	paths.push(
		`/images/sports/solid/${code}.svg`,
		`/images/sports/official/${code}.svg`,
		`/images/sports/official/${code}.avif`,
		`/images/sports/${code}.svg`,
		`/images/sports/${code}.avif`,
	);

	if (code in parentDisciplineMap) {
		const disciplines =
			parentDisciplineMap[code as keyof typeof parentDisciplineMap];
		const validPaths = disciplines.flatMap((d) => getSportsImageSrc(d) ?? []);
		paths.push(...validPaths);
	}

	const match = paths.find((path) => existsSync(`public/${path}`));

	return match;
};
