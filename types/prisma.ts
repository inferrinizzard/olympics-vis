// import type { Sport as PrismaSport } from "@prisma/client";

export type SportKey = string;
export type CountryKey = string;
export type GamesKey = string;

export type CountryAttendance_CountryAthletes = Record<string, number>;

// export type Sport = Omit<PrismaSport, 'sport'> & Record<'sport', SportKey>;
