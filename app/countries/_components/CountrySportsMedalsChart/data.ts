import { cacheStrategy, type CountryCodeParam } from "lib/db";

/** Get medals for sports by a country */
export const getMedalsByCountry = async ({ country }: CountryCodeParam) =>
	prisma.participationRecords
		.groupBy({
			by: "sport",
			_sum: { gold: true, silver: true, bronze: true },
			where: { country },
			cacheStrategy,
		})
		.then((res) =>
			res.map(({ sport, _sum: { gold, silver, bronze } }) => ({
				sport,
				gold: gold ?? 0,
				silver: silver ?? 0,
				bronze: bronze ?? 0,
			})),
		);
