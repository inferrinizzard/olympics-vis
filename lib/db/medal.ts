import prisma from "./prisma";

import type { Games, ParticipationRecords } from "@prisma/client";
import type { MedalType } from "types/prisma";

import type { CountryCodeParam } from "./country";

/** Get number of each medal for a country */
export const getMedalTotalsForCountryBySeason = async ({
	country,
}: CountryCodeParam) =>
	prisma.$queryRaw`
		SELECT country, season, SUM(gold) as gold, SUM(silver) as silver, SUM(bronze) as bronze
		FROM participation_records
		JOIN games_detail
		ON participation_records.games = games_detail.code
		WHERE country = ${country}
		GROUP BY country, season;
	` as Promise<
		(Pick<ParticipationRecords, "country" | MedalType> &
			Pick<Games, "season">)[]
	>;

/** Get countries with most medals from past 10 games */
export const getMedalsLeadersFromLastTenGames = async (
	{ num }: { num?: number } = { num: 10 },
) =>
	prisma.$queryRaw`
	SELECT games, country, total
	FROM (
		SELECT
			last10games.games AS games,
			country,
			CAST(gold + silver + bronze AS SMALLINT) AS total,
			year,
			-- RANK() OVER (PARTITION BY last10games.games ORDER BY gold + silver + bronze DESC) AS num
		FROM participation_records
		JOIN (
			SELECT
				code AS games,
				year
			FROM games_detail
			ORDER BY
				year DESC,
				season ASC
			LIMIT ${num}
		) last10games
		ON participation_records.games = last10games.games
		ORDER BY year, total
	) ranked
	LIMIT ${num};
	-- WHERE num <= ${num}
	-- ORDER BY year, total;
	` as Promise<
		(Pick<ParticipationRecords, "games" | "country"> & { total: number })[]
	>;
