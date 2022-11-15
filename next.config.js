/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		esmExternals: false,
	},
	reactStrictMode: true,
	images: {
		domains: ['upload.wikimedia.org'],
	},
};

module.exports = nextConfig;
