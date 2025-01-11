import prisma from "./prisma";

import type { Prisma } from "@prisma/client";
import type { Country, CountryKey } from "types/prisma";

import { cacheStrategy } from "./cacheStrategy";

export type CountryCodeParam = { country: CountryKey };

/** Get country data for 1 country */
export const getCountry = async ({ country }: CountryCodeParam) =>
	(await prisma.country.findFirst({
		where: { code: country },
		cacheStrategy,
	})) as Country;

/** Get country data for all countries */
export const getAllCountries = async (args?: Prisma.CountryFindManyArgs) =>
	(await prisma.country.findMany({ ...args, cacheStrategy })) as Country[];

// /** Get number of athletes for a country */
// export const getNumberOfAthletesForCountry = async ({
// 	country,
// }: CountryCodeParam): Promise<
// 	Pick<CountryAthletes, "games"> & Record<"athletes", number>
// > =>
// 	prisma.$queryRaw`
// 		SELECT
// 			games,
// 			CAST(country_athletes->>${country} AS SMALLINT) AS athletes
// 		FROM country_athletes
// 		WHERE country_athletes.country_athletes ? ${country};
// 	`;
