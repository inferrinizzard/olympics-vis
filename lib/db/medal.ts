import prisma from "./prisma";

import type { SportParam } from "./sport";
import type { GamesParam } from "./game";

export const getMedalsBySport = async ({ sport }: SportParam) =>
	prisma.countrySportsMedals.findMany({ where: { sport } });

export const getTopTenCountriesForGames = async ({ games }: GamesParam) =>
	await prisma.countryMedals.findMany({
		where: { game: games },
		take: 10,
		include: { country_detail: true },
		orderBy: [{ gold: "desc" }, { silver: "desc" }, { bronze: "desc" }],
	});
