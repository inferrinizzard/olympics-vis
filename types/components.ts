import type { Country, Games } from "@prisma/client";
import type { Sport } from "types/prisma";

export type CountryProps = { country: Country };
export type GamesProps = { games: Games };
export type SportProps = { sport: Sport };
