import type { GamesCodeParam } from "lib/db";

export const getNumCountriesAtGames = ({ games }: GamesCodeParam) =>
	prisma.participationRecords
		.findMany({
			select: { country: true },
			distinct: "country",
			where: { games },
		})
		.then((rows) => rows.length);
