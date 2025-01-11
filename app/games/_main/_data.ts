import { getAllGames } from "lib/db/games";

export const getGamesForPage = async (codeOnly = false) => {
	const games = await getAllGames({
		select: codeOnly ? { code: true } : undefined,
		orderBy: [{ year: "desc" }, { edition: "asc" }, { season: "asc" }],
	});

	return games;
};
