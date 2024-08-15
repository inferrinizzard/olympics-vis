import prisma from "./prisma";

import type { MedalTotals, Games } from "@prisma/client";
import type { CountryParam } from "./country";
import type { GamesParam } from "./game";
import type { SportParam } from "./sport";

/** Get countries that have medals in a sport */
export const getMedalsBySport = async ({ sport }: SportParam) =>
	prisma.countrySportsMedals.findMany({ where: { sport } });

/** Get medals for sports by a country */
export const getMedalsByCountry = async ({ country }: CountryParam) =>
	prisma.countrySportsMedals.findMany({ where: { country } });

/** Get top ten countries with the most medals for a games */
export const getTopTenCountriesForGames = async ({ games }: GamesParam) =>
	await prisma.countryMedals.findMany({
		where: { game: games },
		take: 10,
		include: { country_detail: true },
		orderBy: [{ gold: "desc" }, { silver: "desc" }, { bronze: "desc" }],
	});

/** Get number of each medal for a country */
export const getMedalTotalsForCountry = async ({ country }: CountryParam) =>
	prisma.medalTotals.findMany({
		where: { country },
	});

/** Get medals won at each games for a country */
export const getMedalTotalsPerGamesForCountry = async ({
	country,
}: CountryParam) => prisma.countryMedals.findMany({ where: { country } });

export const getMedalsLeadersFromLastTenGames = async (): Promise<
	(Pick<MedalTotals, "country"> &
		Pick<Games, "game" | "year"> & { total: number })[]
> =>
	prisma.$queryRaw`
		SELECT game, country, total
		FROM (
			SELECT
				last10games.game AS game,
				country,
				CAST(gold + silver + bronze AS SMALLINT) AS total,
				year,
				RANK() OVER (PARTITION BY last10games.game ORDER BY gold + silver + bronze DESC) AS num
			FROM country_game_medals
			JOIN (
				SELECT game, year
				FROM games_detail
				ORDER BY year DESC, season ASC
				LIMIT 10
			) last10games
			ON country_game_medals.game = last10games.game
		) ranked
		WHERE num <= 5
		ORDER BY year, total;
		`;
