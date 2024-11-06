import type { ParticipationRecords } from "@prisma/client";
import type { MedalType } from "types/prisma";

import { cacheStrategy, type SportCodeParam } from "lib/db";

/** Get countries that have medals in a sport */
export const getCountriesWithMedals = async ({ sport }: SportCodeParam) =>
	prisma.participationRecords
		.groupBy({
			by: "country",
			_sum: { gold: true, silver: true, bronze: true },
			where: { sport },
			orderBy: [
				{ _sum: { gold: "desc" } },
				{ _sum: { silver: "desc" } },
				{ _sum: { bronze: "desc" } },
				{ country: "desc" },
			],
			cacheStrategy,
		})
		.then((res) =>
			res.map(({ country, _sum: { gold, silver, bronze } }) => ({
				country,
				gold: gold ?? 0,
				silver: silver ?? 0,
				bronze: bronze ?? 0,
			})),
		);

export type CountriesWithMedals = Pick<
	ParticipationRecords,
	"country" | MedalType
>;
