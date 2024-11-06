import { writeFile } from "node:fs";

import { prisma } from "lib/db/prisma";
import type { PathKey } from "types/prisma";

import { getGameName } from "lib/utils/getGameName";

const buildSearchJson = async () => {
	const countries = await prisma.country.findMany({
		select: { code: true, name: true },
	});

	const games = await prisma.games.findMany({
		select: { code: true },
	});

	const sports = await prisma.sport.findMany({
		select: { code: true, name: true },
	});

	const data = [
		...countries.map((row) => ({ path: "countries" as PathKey, ...row })),
		...games.map(({ code }) => ({
			path: "games" as PathKey,
			code,
			name: getGameName(code),
		})),
		...sports.map((row) => ({ path: "sports" as PathKey, ...row })),
	];

	return writeFile(
		"./components/shell/Search/searchStrings.json",
		JSON.stringify(data, undefined, 2),
		() => {},
	);
};

buildSearchJson();
