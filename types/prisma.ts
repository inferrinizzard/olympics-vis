import type {
	ParticipationRecords,
	Country as PrismaCountry,
	Games as PrismaGames,
	Sport as PrismaSport,
} from "@prisma/client";

export type CountryKey = string & PrismaCountry["code"];
export type GamesKey = string & PrismaGames["code"];
export type SportKey = string & PrismaSport["code"];

export type MedalType = keyof ParticipationRecords &
	("gold" | "silver" | "bronze");
export type AthleteSex = keyof ParticipationRecords & ("men" | "women");
