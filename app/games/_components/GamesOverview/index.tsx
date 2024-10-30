import type { GamesProps } from "types";

import { getWikipediaExcerpt } from "lib/utils/wikipedia";

import GamesOverview_Client from "./client";

const GamesOverview = async ({ games }: GamesProps) => {
	const wikipediaExcerpt = await getWikipediaExcerpt(games.page_name);

	return (
		<GamesOverview_Client games={games} wikipediaExcerpt={wikipediaExcerpt} />
	);
};

export default GamesOverview;
