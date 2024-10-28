import type { GamesCodeParam } from "lib/db";

/** Get number of athletes from each country for a games */
export const getAthletesByCountryForGames = async ({ games }: GamesCodeParam) =>
	prisma.participationRecords
		.groupBy({
			by: "country",
			_sum: { men: true, women: true },
			where: { games },
		})
		.then((res) =>
			res.map(({ country, _sum: { men, women } }) => ({
				country,
				men: men ?? 0,
				women: women ?? 0,
			})),
		);
