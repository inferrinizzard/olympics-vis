import prisma from "lib/db/prisma";
import { cacheStrategy, type CountryCodeParam } from "lib/db";

/** Get first games that a country attended */
export const getFirstGamesForCountry = async ({ country }: CountryCodeParam) =>
	prisma.participationRecords.findFirst({
		orderBy: { games_detail: { year: "asc" } },
		where: { country },
		cacheStrategy,
	});

/** Get all medals for country */
export const getAllMedalsForCountry = async ({ country }: CountryCodeParam) =>
	prisma.participationRecords
		.aggregate({
			_sum: { gold: true, silver: true, bronze: true },
			where: { country },
			cacheStrategy,
		})
		.then(({ _sum: { gold, silver, bronze } }) => ({
			gold: gold ?? 0,
			silver: silver ?? 0,
			bronze: bronze ?? 0,
		}));

export const getBestGamesForCountry = async ({ country }: CountryCodeParam) =>
	prisma.participationRecords
		.groupBy({
			by: "games",
			orderBy: [
				{ _sum: { gold: "desc" } },
				{ _sum: { silver: "desc" } },
				{ _sum: { bronze: "desc" } },
			],
			where: { country },
			take: 1,
			cacheStrategy,
		})
		.then((res) => res[0]);

export const getBestSportForCountry = async ({ country }: CountryCodeParam) =>
	prisma.participationRecords
		.groupBy({
			by: "sport",
			orderBy: [
				{ _sum: { gold: "desc" } },
				{ _sum: { silver: "desc" } },
				{ _sum: { bronze: "desc" } },
			],
			where: { country },
			take: 1,
			cacheStrategy,
		})
		.then((res) => res[0]);
