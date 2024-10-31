import type { CountryKey, GamesKey } from "types/prisma";

import type { SportCodeParam } from "lib/db";

export const getBestCountryForSport = async ({ sport }: SportCodeParam) =>
	prisma.participationRecords
		.groupBy({
			by: "country",
			// _sum: { gold: true, silver: true, bronze: true },
			orderBy: [
				{ _sum: { gold: "desc" } },
				{ _sum: { silver: "desc" } },
				{ _sum: { bronze: "desc" } },
			],
			where: { sport },
			take: 1,
		})
		.then((res) => res[0].country as CountryKey);

export const getFirstGamesForSport = async ({ sport }: SportCodeParam) =>
	prisma.participationRecords
		.groupBy({
			by: "games",
			where: { sport },
			orderBy: { games: "asc" }, // games start with year
			take: 1,
		})
		.then((res) => res[0].games as GamesKey);
