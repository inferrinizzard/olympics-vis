import { cacheStrategy, type CountryCodeParam } from "lib/db";

/** Get medals won at each games for a country */
export const getMedalTotalsPerGamesForCountry = async ({
	country,
}: CountryCodeParam) =>
	prisma.participationRecords
		.groupBy({
			by: "games",
			_sum: { gold: true, silver: true, bronze: true },
			where: { country },
			orderBy: { games: "asc" },
			cacheStrategy,
		})
		.then((res) =>
			res.map(({ games, _sum: { gold, silver, bronze } }) => ({
				games,
				gold: gold ?? 0,
				silver: silver ?? 0,
				bronze: bronze ?? 0,
			})),
		);
