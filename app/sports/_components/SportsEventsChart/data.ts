import type { SportCodeParam } from "lib/db";

// TODO-EVENTS: needs new data
/** Get count of events for sport in each game */
export const getSportEventCountByGame = async ({ sport }: SportCodeParam) => [];
// prisma.sportsEvent.groupBy({
// 	by: ["game"],
// 	_count: { sport: true },
// 	where: { sport },
// });
