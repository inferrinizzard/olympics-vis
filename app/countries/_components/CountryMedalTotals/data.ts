import type { ParticipationRecords } from "@prisma/client";
import type { Games, MedalType } from "types/prisma";

import prisma from "lib/db/prisma";
import type { CountryCodeParam } from "lib/db";

/** Get number of each medal for a country */
export const getMedalTotalsForCountry = async ({ country }: CountryCodeParam) =>
	prisma.$queryRaw`
		SELECT
			country,
			season,
			edition,
			CAST(SUM(gold) AS INT2) as gold,
			CAST(SUM(silver) AS INT2) as silver,
			CAST(SUM(bronze) AS INT2) as bronze
		FROM participation_records
		JOIN games_detail
		ON participation_records.games = games_detail.code
		WHERE country = ${country}
		GROUP BY country, season, edition;
	` as Promise<CountryMedalTotalsRow[]>;

export type CountryMedalTotalsRow = Pick<
	ParticipationRecords,
	"country" | MedalType
> &
	Pick<Games, "season" | "edition">;
