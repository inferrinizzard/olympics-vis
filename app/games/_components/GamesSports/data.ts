import type { SportKey } from "types/prisma";

import prisma from "lib/db/prisma";
import { cacheStrategy, type GamesCodeParam } from "lib/db";

/** Get sports that were held at a games */
export const getSportsForGames = async ({ games }: GamesCodeParam) =>
	prisma.participationRecords
		.groupBy({ by: "sport", where: { games }, cacheStrategy })
		.then((res) => res.map(({ sport }) => sport as SportKey));
