import type { SportProps } from "types";

import { getWikipediaExcerpt } from "lib/utils/wikipedia";

import SportsOverview_Client from "./client";
import { getBestCountryForSport, getFirstGamesForSport } from "./data";

const SportsOverview = async ({ sport }: SportProps) => {
	const wikipediaExcerpt = await getWikipediaExcerpt(sport.page_name);

	const bestCountry = await getBestCountryForSport({ sport: sport.code });
	const firstGames = await getFirstGamesForSport({ sport: sport.code });
	// const numEvents;

	return (
		<SportsOverview_Client
			sport={sport}
			wikipediaExcerpt={wikipediaExcerpt}
			bestCountry={bestCountry}
			firstGames={firstGames}
		/>
	);
};

export default SportsOverview;
