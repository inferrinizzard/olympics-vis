import type { GamesProps } from "types";

import { getWikipediaExcerpt } from "lib/utils/wikipedia";

import GamesOverview_Client from "./client";
import { getNumCountriesAtGames } from "./data";

const GamesOverview = async ({ games }: GamesProps) => {
	const wikipediaExcerpt = await getWikipediaExcerpt(games.page_name);

	const numCountriesAtGames = await getNumCountriesAtGames({
		games: games.code,
	});

	return (
		<GamesOverview_Client
			games={games}
			numCountries={numCountriesAtGames}
			wikipediaExcerpt={wikipediaExcerpt}
		/>
	);
};

export default GamesOverview;
