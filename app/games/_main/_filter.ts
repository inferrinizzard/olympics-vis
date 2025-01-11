import type { PageProps } from "types/next";
import type { Games } from "types/prisma";

export const filterGames = (
	games: Games[],
	searchParams: PageProps["searchParams"],
) => {
	const searchEntries = Object.entries(searchParams).map(([key, values]) =>
		values ? [key, [values].flat()] : [],
	);

	const filteredGames = searchEntries.length
		? games.filter((game) =>
				searchEntries.every(
					([key, values]) =>
						game[key as keyof Games] &&
						values.includes(game[key as keyof Games] as string),
				),
			)
		: games;

	const filterKeys = ["season", "edition"] as const;
	const filters = filterKeys.map(
		(filterKey) =>
			[
				filterKey,
				Array.from(new Set(games.map((game) => game[filterKey]))),
			] as const,
	);

	return { filteredGames, filters };
};
