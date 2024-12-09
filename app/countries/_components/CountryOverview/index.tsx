import type { CountryProps } from "types";

import { getWikipediaExcerpt } from "lib/utils/wikipedia";

import CountryOverview_Client from "./client";
import {
	getAllMedalsForCountry,
	getBestGamesForCountry,
	getBestSportForCountry,
	getFirstGamesForCountry,
} from "./data";

const CountryOverview = async ({ country }: CountryProps) => {
	const firstGames =
		(await getFirstGamesForCountry({ country: country.code }))?.games ?? "";

	const wikipediaExcerpt = await getWikipediaExcerpt(country.page_name);

	const totalMedals = Object.values(
		await getAllMedalsForCountry({
			country: country.code,
		}),
	).reduce((sum, n) => sum + n);

	const bestGames = (await getBestGamesForCountry({ country: country.code }))
		?.games;

	const bestSport = (await getBestSportForCountry({ country: country.code }))
		?.sport;

	return (
		<CountryOverview_Client
			country={country}
			overviewData={{ firstGames, totalMedals, bestGames, bestSport }}
			wikipediaExcerpt={wikipediaExcerpt}
		/>
	);
};

export default CountryOverview;
