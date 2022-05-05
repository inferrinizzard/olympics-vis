export type GamesKey = string;

export interface GamesMain {
	summer: string[];
	winter: string[];
}

export interface GameDetail {
	year: number;
	season: string;
	title: string;
	host: string;
	countries: string[];
	start: string;
	end: string;
	numAthletes: number;
	emblem: string;
}

export interface CountryDetail {
	code: string;
	name: string;
	flag: string;
}

export interface SportDetail {
	code: string;
	name: string;
	icon: string;
}
