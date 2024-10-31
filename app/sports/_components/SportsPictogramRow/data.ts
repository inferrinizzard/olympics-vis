import type { GamesKey } from "types/prisma";

import type { SportCodeParam } from "lib/db";

export const getAllGamesForSport = async ({ sport }: SportCodeParam) =>
	prisma.participationRecords
		.findMany({ select: { games: true }, distinct: "games", where: { sport } })
		.then((res) => res.map(({ games }) => games as GamesKey));
