import prisma from "./prisma";

import type { Prisma } from "@prisma/client";
import type { GamesKey } from "types/prisma";

export type GamesParam = { games: GamesKey };

/** Get games data for 1 games */
export const getGames = async ({ games }: GamesParam) =>
	await prisma.games.findFirst({ where: { code: games } });

/** Get games data for all games */
export const getAllGames = async (args?: Prisma.GamesFindManyArgs) =>
	prisma.games.findMany(args);

/** Get number of athletes from each country for a games */
export const getCountryAthletesForGames = async ({ games }: GamesParam) =>
	prisma.countryAthletes.findFirst({
		where: { game: games },
	});
