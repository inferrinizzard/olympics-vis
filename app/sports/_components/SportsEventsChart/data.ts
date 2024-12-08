// import prisma from "lib/db/prisma";
import type { SportCodeParam } from "lib/db";

// TODO-EVENTS: needs new data
/** Get count of events for sport in each games */
export const getSportEventCountByGame = async ({ sport }: SportCodeParam) => [];
// prisma.sportsEvent.groupBy({
// 	by: ["games"],
// 	_count: { sport: true },
// 	where: { sport },
// });
