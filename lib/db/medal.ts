import prisma from "./prisma";

import type { Games, ParticipationRecords } from "@prisma/client";
import type { MedalType } from "types/prisma";

import type { CountryCodeParam } from "./country";
import type { GamesCodeParam } from "./game";
import type { SportCodeParam } from "./sport";

/** Get countries that have medals in a sport */
export const getMedalsBySport = async ({ sport }: SportCodeParam) =>
	prisma.participationRecords
		.groupBy({
			by: "country",
			_sum: { gold: true, silver: true, bronze: true },
			where: { sport },
		})
		.then((res) =>
			res.map(({ country, _sum: { gold, silver, bronze } }) => ({
				country,
				gold: gold ?? 0,
				silver: silver ?? 0,
				bronze: bronze ?? 0,
			})),
		);

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

/** Get top ten countries with the most medals for a games */
export const getTopCountriesForGames = async ({
	games,
	num = 10,
}: GamesCodeParam & { num?: number }) =>
	await prisma.participationRecords
		.groupBy({
			by: "country",
			take: num,
			_sum: { gold: true, silver: true, bronze: true },
			orderBy: {
				_sum: {
					gold: "desc",
					silver: "desc",
					bronze: "desc",
				},
			},
			where: { game: games },
		})
		.then((res) =>
			res.map(({ country, _sum: { gold, silver, bronze } }) => ({
				country,
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
