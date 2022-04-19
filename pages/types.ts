export interface GamesMain {
	summer: string[];
	winter: string[];
}

export interface YearSeasonDetail {
	countries: string[];
	host: string;
	cities: string[];
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
