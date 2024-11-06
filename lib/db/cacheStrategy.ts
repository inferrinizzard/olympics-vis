import type { PrismaCacheStrategy } from "@prisma/extension-accelerate";

const isProd = process.env.NODE_ENV === "production";

const devCacheStrategy: PrismaCacheStrategy = {
	cacheStrategy: {
		ttl: 60 * 60 * 24 * 7, // 7 days
		swr: 60 * 60 * 24 * 7, // 7 days
	},
};

const prodCacheStrategy: PrismaCacheStrategy = {
	cacheStrategy: {
		ttl: 60 * 60 * 24, // 1 day
		swr: 60 * 60 * 24, // 1 day
	},
};

export const cacheStrategy = isProd ? prodCacheStrategy : devCacheStrategy;
