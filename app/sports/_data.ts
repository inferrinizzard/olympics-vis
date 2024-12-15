import type { Sport } from "types/prisma";

import { getAllSports } from "lib/db/sport";

export const getSportsForPage = async (codeOnly = false) => {
	const sports = await getAllSports(
		codeOnly
			? { select: { code: true, category: true, season: true, status: true } }
			: undefined,
	);

	const sportsLists = sports.reduce(
		(lists, sport) => {
			if (
				(sport.category === "discipline" || sport.code.startsWith("P-")) &&
				sport.season === "summer"
			) {
				lists.summer.push(sport);
			} else if (
				(sport.category === "discipline" || sport.code.startsWith("P-")) &&
				sport.season === "winter"
			) {
				lists.winter.push(sport);
			} else if (sport.status === "other") {
				lists.other.push(sport);
			} else if (sport.status === "unrecognised") {
				lists.unrecognised.push(sport);
			} else if (sport.category === "sport") {
				lists.categories.push(sport);
			} else {
				lists.misc.push(sport);
			}

			return lists;
		},
		{
			summer: [] as Sport[],
			winter: [] as Sport[],
			other: [] as Sport[],
			unrecognised: [] as Sport[],
			categories: [] as Sport[],
			misc: [] as Sport[],
		},
	);

	return sportsLists;
};
