import type { ParticipationRecords, Games } from "@prisma/client";
import type { MedalType } from "types/prisma";

import type { CountryCodeParam } from "lib/db";

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
	` as Promise<CountryMedalTotalsWithSeason[]>;

export type CountryMedalTotalsWithSeason = Pick<
	ParticipationRecords,
	"country" | MedalType
> &
	Pick<Games, "season">;
