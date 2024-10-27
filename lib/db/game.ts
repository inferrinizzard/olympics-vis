import prisma from "./prisma";

import type { Prisma } from "@prisma/client";
import type { GamesKey, SportKey } from "types/prisma";

export type GamesParam = { games: GamesKey };

/** Get games data for 1 games */
export const getGames = async ({ games }: GamesParam) =>
	await prisma.games.findFirst({ where: { code: games } });

/** Get games data for all games */
export const getAllGames = async (args?: Prisma.GamesFindManyArgs) =>
	prisma.games.findMany(args);

/** Get number of athletes from each country for a games */
export const getAthletesByCountryForGames = async ({ games }: GamesParam) =>
	prisma.participationRecords
		.groupBy({
			by: "country",
			_sum: { men: true, women: true },
			where: { game: games },
		})
		.then((res) =>
			res.map(({ country, _sum: { men, women } }) => ({
				country,
				men: men ?? 0,
				women: women ?? 0,
			})),
		);

/** Get sports that were held at a games */
export const getSportsForGames = async ({ games }: GamesParam) =>
	prisma.participationRecords
		.groupBy({ by: "sport", where: { game: games } })
		.then((res) => res.map(({ sport }) => sport as SportKey));
