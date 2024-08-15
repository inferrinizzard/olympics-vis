import prisma from "./prisma";

import type { Games, Sport } from "@prisma/client";
import type { SportKey } from "types/prisma";
import type { GamesParam } from "./game";

export type SportParam = { sport: SportKey };

/** Get sport key and name for 1 sport */
export const getSport = async ({ sport }: SportParam) =>
	await prisma.sport.findFirst({ where: { sport } });

/** Get sport key and name for all sports */
export const getAllSports = async () =>
	await prisma.sport.findMany({ select: { sport: true, name: true } });

/** Get count of events for sport in each game */
export const getSportEventCountByGame = async ({ sport }: SportParam) =>
	prisma.sportsEvent.groupBy({
		by: ["game"],
		_count: { sport: true },
		where: { sport },
	});

/** Get sports and corresponding season */
export const getSportWithSeason = async (): Promise<
	(Pick<Games, "season"> & { sport: Sport["sport"][] })[]
> =>
	prisma.$queryRaw`
		SELECT sport, season
		FROM (
			SELECT DISTINCT ON (season) game, season
			FROM games_detail
			ORDER BY season, year DESC
		) latest_games
		JOIN (
			SELECT ARRAY_AGG(DISTINCT sport) AS sport, game
			FROM sports_events
			GROUP BY game
		) sports
		ON latest_games.game = sports.game
		;
	`;

/** Get sport events for a specific games */
export const getSportEventsForGame = async ({ games }: GamesParam) =>
	prisma.sportsEvent.findMany({
		where: { game: games },
		distinct: "sport",
		// include: { sport_detail: true },
	});
