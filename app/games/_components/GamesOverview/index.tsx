import type { GamesProps } from "types";

import { getWikipediaExcerpt } from "lib/utils/wikipedia";

import GamesOverview_Server from "./server";
import { getNumCountriesAtGames } from "./data";

const GamesOverview = async ({ games }: GamesProps) => {
	const wikipediaExcerpt = await getWikipediaExcerpt(games.page_name);

	const numCountriesAtGames = await getNumCountriesAtGames({
		games: games.code,
	});

	return (
		<GamesOverview_Server
			games={games}
			numCountries={numCountriesAtGames}
			wikipediaExcerpt={wikipediaExcerpt}
		/>
	);
};

export default GamesOverview;
