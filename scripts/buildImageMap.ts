import { writeFile } from "node:fs";

import { cacheStrategy } from "lib/db";
import { prisma } from "lib/db/prisma";

import { getAllGamesForSport } from "app/sports/_components/SportsPictogramRow/data";
import {
	buildImageMapKey,
	getCountryImageSrc,
	getGamesImageSrc,
	getSportsImageSrc,
} from "lib/utils/getImageSrc";

const imageMap: Record<string, string> = {};
const olympicFallback = "/images/country/shared/Olympic_flag.svg";
const paralympicFallback = "/images/country/shared/Paralympic_flag.svg";

const buildImageMap = async () => {
	const countries = await prisma.country.findMany({
		select: { code: true, name: true },
		cacheStrategy,
	});

	for (const { code, name } of countries) {
		const mapKey = buildImageMapKey("country", code);

		const src = getCountryImageSrc(code);

		imageMap[mapKey] =
			src ??
			(name.toLowerCase().includes("para")
				? paralympicFallback
				: olympicFallback);
	}

	const games = await prisma.games.findMany({
		select: { code: true, edition: true },
		cacheStrategy,
	});

	for (const { code, edition } of games) {
		const mapKey = buildImageMapKey("games", code);

		const src = getGamesImageSrc(code);

		imageMap[mapKey] =
			src ?? (edition === "paralympics" ? paralympicFallback : olympicFallback);
	}

	const sports = await prisma.sport.findMany({
		select: { code: true, parent: true },
		cacheStrategy,
	});

	for (const { code, parent } of sports) {
		const mapKey = buildImageMapKey("sports", code);

		const src = getSportsImageSrc(code, parent);

		imageMap[mapKey] =
			src ?? (code.startsWith("P-") ? paralympicFallback : olympicFallback);

		const gamesForSport = await getAllGamesForSport({ sport: code });

		for (const game of gamesForSport) {
			const gamesMapKey = buildImageMapKey("sports", code, game);

			const gamesSrc = getSportsImageSrc(code, parent, game);

			if (gamesSrc !== src) {
				imageMap[gamesMapKey] =
					gamesSrc ??
					(code.startsWith("P-") ? paralympicFallback : olympicFallback);
			}
		}
	}

	return writeFile(
		"./components/util/imageMap.json",
		JSON.stringify(imageMap, undefined, 2),
		() => {},
	);
};

buildImageMap();
