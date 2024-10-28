import prisma from "./prisma";

import type { Games, ParticipationRecords } from "@prisma/client";
import type { MedalType } from "types/prisma";

import type { CountryCodeParam } from "./country";
import type { GamesCodeParam } from "./game";

/** Get medals for sports by a country */
export const getMedalsByCountry = async ({ country }: CountryCodeParam) =>
	prisma.participationRecords
		.groupBy({
			by: "sport",
			_sum: { gold: true, silver: true, bronze: true },
			where: { country },
		})
		.then((res) =>
			res.map(({ sport, _sum: { gold, silver, bronze } }) => ({
				sport,
				gold: gold ?? 0,
				silver: silver ?? 0,
				bronze: bronze ?? 0,
			})),
		);

/** Get number of each medal for a country */
export const getMedalTotalsForCountryBySeason = async ({
	country,
}: CountryCodeParam) =>
	prisma.$queryRaw`
		SELECT country, season, SUM(gold) as gold, SUM(silver) as silver, SUM(bronze) as bronze
		FROM participation_records
		JOIN games_detail
		ON participation_records.game = games_detail.game
		WHERE country = ${country}
		GROUP BY country, season;
	` as Promise<
		(Pick<ParticipationRecords, "country" | MedalType> &
			Pick<Games, "season">)[]
	>;

/** Get medals won at each games for a country */
export const getMedalTotalsPerGamesForCountry = async ({
	country,
}: CountryCodeParam) =>
	prisma.participationRecords
		.groupBy({
			by: "game",
			_sum: { gold: true, silver: true, bronze: true },
			where: { country },
		})
		.then((res) =>
			res.map(({ game, _sum: { gold, silver, bronze } }) => ({
				game,
				gold: gold ?? 0,
				silver: silver ?? 0,
				bronze: bronze ?? 0,
			})),
		);

/** Get countries with most medals from past 10 games */
export const getMedalsLeadersFromLastTenGames = async (
	{ num }: { num?: number } = { num: 10 },
) =>
	prisma.$queryRaw`
	SELECT game, country, total
	FROM (
		SELECT
			last10games.game AS game,
			country,
			CAST(gold + silver + bronze AS SMALLINT) AS total,
			year,
			-- RANK() OVER (PARTITION BY last10games.game ORDER BY gold + silver + bronze DESC) AS num
		FROM participation_records
		JOIN (
			SELECT
				code AS game,
				year
			FROM games_detail
			ORDER BY
				year DESC,
				season ASC
			LIMIT ${num}
		) last10games
		ON participation_records.game = last10games.game
		ORDER BY year, total
	) ranked
	LIMIT ${num};
	-- WHERE num <= ${num}
	-- ORDER BY year, total;
	` as Promise<
		(Pick<ParticipationRecords, "game" | "country"> & { total: number })[]
	>;
