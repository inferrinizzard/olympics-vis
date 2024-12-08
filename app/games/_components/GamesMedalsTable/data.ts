import prisma from "lib/db/prisma";
import { cacheStrategy, type GamesCodeParam } from "lib/db";

/** Get top ten countries with the most medals for a games */
export const getTopCountriesForGames = async ({
	games,
	num = 10,
}: GamesCodeParam & { num?: number }) =>
	await prisma.participationRecords
		.groupBy({
			by: "country",
			take: num,
			_sum: { gold: true, silver: true, bronze: true },
			orderBy: [
				{ _sum: { gold: "desc" } },
				{ _sum: { silver: "desc" } },
				{ _sum: { bronze: "desc" } },
			],
			where: { games },
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
