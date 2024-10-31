import prisma from "./prisma";

import type { Games, Prisma } from "@prisma/client";
import type { Sport, SportKey } from "types/prisma";
import type { GamesCodeParam } from "./games";

export type SportCodeParam = { sport: SportKey };

/** Get sport key and name for 1 sport */
export const getSport = async ({ sport }: SportCodeParam) =>
	(await prisma.sport.findFirst({ where: { code: sport } })) as Sport;

/** Get sport key and name for all sports */
export const getAllSports = async (args?: Prisma.SportFindManyArgs) =>
	(await prisma.sport.findMany(args)) as Sport[];

/** Get sports and corresponding season */
export const getSportWithSeason = async () =>
	prisma.sport.groupBy({ by: ["season", "status"] });

// prisma.$queryRaw`
// 	SELECT sport, season
// 	FROM (
// 		SELECT DISTINCT ON (season) games, season
// 		FROM games_detail
// 		ORDER BY season, year DESC
// 	) latest_games
// 	JOIN (
// 		SELECT ARRAY_AGG(DISTINCT sport) AS sport, games
// 		FROM sports_events
// 		GROUP BY games
// 	) sports
// 	ON latest_games.games = sports.games
// 	;
// `;

// TODO-EVENTS: needs new data
/** Get sport events for a specific games */
export const getSportEventsForGame = async ({ games }: GamesCodeParam) => [];
// prisma.sportsEvent.findMany({
// 	where: { games },
// 	distinct: "sport",
// 	// include: { sport_detail: true },
// });
