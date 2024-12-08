import prisma from "lib/db/prisma";
import { cacheStrategy, type GamesCodeParam } from "lib/db";

export const getNumCountriesAtGames = ({ games }: GamesCodeParam) =>
	prisma.participationRecords
		.findMany({
			select: { country: true },
			distinct: "country",
			where: { games },
			cacheStrategy,
		})
		.then((rows) => rows.length);
