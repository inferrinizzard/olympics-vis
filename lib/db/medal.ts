import prisma from "./prisma";

import type { ParticipationRecords } from "@prisma/client";

import type { CountryParam } from "./country";
import type { GamesParam } from "./game";
import type { SportParam } from "./sport";

/** Get countries that have medals in a sport */
export const getMedalsBySport = async ({ sport }: SportParam) =>
	prisma.participationRecords.groupBy({
		by: "country",
		_sum: { gold: true, silver: true, bronze: true },
		where: { sport },
	});

/** Get medals for sports by a country */
export const getMedalsByCountry = async ({ country }: CountryParam) =>
	prisma.participationRecords.groupBy({
		by: "sport",
		_sum: { gold: true, silver: true, bronze: true },
		where: { country },
	});

/** Get top ten countries with the most medals for a games */
export const getTopCountriesForGames = async ({
	games,
	num = 10,
}: GamesParam & { num?: number }) =>
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
export const getMedalTotalsForCountry = async ({ country }: CountryParam) =>
	prisma.participationRecords
		.groupBy({
			by: "country",
			_sum: { gold: true, silver: true, bronze: true },
			where: { country },
		})
		.then((res) =>
			res.map(({ country, _sum: { gold, silver, bronze } }) => ({
				country,
				gold: gold ?? 0,
				silver: silver ?? 0,
				bronze: bronze ?? 0,
			})),
		);

/** Get medals won at each games for a country */
export const getMedalTotalsPerGamesForCountry = async ({
	country,
}: CountryParam) =>
	prisma.participationRecords.groupBy({
		by: "game",
		_sum: { gold: true, silver: true, bronze: true },
		where: { country },
	});

/** Get countries with most medals from past 10 games */
export const getMedalsLeadersFromLastTenGames = async ({
	num = 5,
}: { num?: number }) =>
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
			LIMIT 10
		) last10games
		ON participation_records.game = last10games.game
		ORDER BY year, total
	) ranked
	LIMIT ${num};
	-- WHERE num <= ${num}
	-- ORDER BY year, total;
	` as Promise<
		Pick<ParticipationRecords, "game" | "country"> & { total: number }
	>;
