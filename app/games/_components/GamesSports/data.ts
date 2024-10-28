import type { SportKey } from "types/prisma";

import type { GamesCodeParam } from "lib/db";

/** Get sports that were held at a games */
export const getSportsForGames = async ({ games }: GamesCodeParam) =>
	prisma.participationRecords
		.groupBy({ by: "sport", where: { games } })
		.then((res) => res.map(({ sport }) => sport as SportKey));
