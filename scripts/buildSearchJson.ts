import { writeFile } from "node:fs";

import { PrismaClient } from "@prisma/client";

import { getGameName } from "lib/utils/getGameName";

const prisma = new PrismaClient();

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
		...countries.map((row) => ({ type: "country", ...row })),
		...games.map(({ code }) => ({
			dir: "games",
			code,
			name: getGameName(code),
		})),
		...sports.map((row) => ({ type: "sport", ...row })),
	];

	return writeFile(
		"./components/shell/Search/searchStrings.json",
		JSON.stringify(data, undefined, 2),
		() => {},
	);
};

buildSearchJson();
