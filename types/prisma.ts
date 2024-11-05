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
export type GamesSeason = "summer" | "winter";

export type Games = {
	code: string & GamesKey;
	year: string & PrismaGames["year"];
	host: string & PrismaGames["host"];
	season: GamesSeason & PrismaGames["season"];
	edition: ("olympics" | "paralympics" | "youth") & PrismaGames["edition"];
	motto?: PrismaGames["motto"];
	num_athletes?: PrismaGames["num_athletes"];
	start_date?: PrismaGames["start_date"];
	end_date?: PrismaGames["end_date"];
	page_name?: PrismaGames["page_name"];
};

export type Sport = {
	code: string & SportKey;
	name: string & PrismaSport["name"];
	category: ("sport" | "discipline" | "general") & PrismaSport["category"];
	status?: ("active" | "other" | "unrecognised") & PrismaSport["status"];
	season?: ("summer" | "winter") & PrismaSport["season"];
	parent?: PrismaSport["parent"];
	page_name?: PrismaSport["page_name"];
};

export type PathKey = "countries" | "games" | "sports";
