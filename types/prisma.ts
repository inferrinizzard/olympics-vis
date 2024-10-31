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

export type Sport = {
	code: string & SportKey;
	name: string & PrismaSport["name"];
	category: ("sport" | "discipline" | "general") & PrismaSport["category"];
	status?: ("active" | "other" | "unrecognised") & PrismaSport["status"];
	season?: ("summer" | "winter") & PrismaSport["season"];
	parent?: string & PrismaSport["parent"];
	page_name?: string & PrismaSport["page_name"];
};
