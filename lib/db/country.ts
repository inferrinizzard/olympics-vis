import prisma from "./prisma";

import type { Prisma } from "@prisma/client";
import type { CountryKey } from "types/prisma";

export type CountryParam = { country: CountryKey };

/** Get country data for 1 country */
export const getCountry = async ({ country }: CountryParam) =>
	prisma.country.findFirst({
		where: { code: country },
	});

/** Get country data for all countries */
export const getAllCountries = async (args?: Prisma.CountryFindManyArgs) =>
	prisma.country.findMany(args);

/** Get first games that a country attended */
export const getFirstGamesForCountry = async ({ country }: CountryParam) =>
	prisma.participationRecords.findFirst({
		orderBy: { games_detail: { year: "asc" } },
		where: { country },
	});

/** Get number of athletes for a country */
export const getNumberOfAthletesForCountry = async ({
	country,
}: CountryParam): Promise<
	Pick<CountryAthletes, "game"> & Record<"athletes", number>
> =>
	prisma.$queryRaw`
		SELECT
			game,
			CAST(country_athletes->>${country} AS SMALLINT) AS athletes
		FROM country_athletes
		WHERE country_athletes.country_athletes ? ${country};
	`;
