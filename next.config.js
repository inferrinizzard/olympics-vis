/** @type {import('next').NextConfig} */

import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
	},
	images: {
		domains: ["upload.wikimedia.org"],
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
		minimumCacheTTL: 600,
	},
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

module.exports = withVanillaExtract(withBundleAnalyzer(nextConfig));
