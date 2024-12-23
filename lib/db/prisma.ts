import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const isProd = process.env.NODE_ENV === "production";

declare global {
	// allow global `var` declarations
	var prisma: PrismaClient & ReturnType<typeof createPrismaClient>;
}

const createPrismaClient = () => {
	const client = new PrismaClient({ log: isProd ? [] : ["query"] }).$extends(
		withAccelerate(),
	);

	return client;
};

// biome-ignore lint/suspicious/noRedeclare: <explanation>
export const prisma = global.prisma || createPrismaClient();

if (!isProd) global.prisma = prisma;

export default prisma;
