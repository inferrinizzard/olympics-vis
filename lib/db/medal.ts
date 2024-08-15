import prisma from "./prisma";

import type { SportKey } from "types/prisma";

export const getMedalsBySport = async ({ sport }: { sport: SportKey }) =>
	prisma.countrySportsMedals.findMany({ where: { sport } });
