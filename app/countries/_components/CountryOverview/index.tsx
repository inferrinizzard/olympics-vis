import type { CountryProps } from "types";

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
			pageName={country.page_name}
		/>
	);
};

export default CountryOverview;
