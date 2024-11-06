import prisma from "./prisma";

import type { Prisma } from "@prisma/client";
import type { GamesKey } from "types/prisma";

import { cacheStrategy } from "./cacheStrategy";

export type GamesCodeParam = { games: GamesKey };

/** Get games data for 1 games */
export const getGames = async ({ games }: GamesCodeParam) =>
	await prisma.games.findFirst({ where: { code: games }, cacheStrategy });

/** Get games data for all games */
export const getAllGames = async (args?: Prisma.GamesFindManyArgs) =>
	prisma.games.findMany({ ...args, cacheStrategy });
