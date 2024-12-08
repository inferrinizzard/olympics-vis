import type { GamesKey } from "types/prisma";

import prisma from "lib/db/prisma";
import { cacheStrategy, type SportCodeParam } from "lib/db";

export const getAllGamesForSport = async ({ sport }: SportCodeParam) =>
	prisma.participationRecords
		.findMany({
			select: { games: true },
			distinct: "games",
			where: { sport },
			cacheStrategy,
		})
		.then((res) => res.map(({ games }) => games as GamesKey));
