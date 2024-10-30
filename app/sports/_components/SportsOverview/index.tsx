import type { SportProps } from "types";

import { getWikipediaExcerpt } from "lib/utils/wikipedia";

import SportsOverview_Client from "./client";

const SportsOverview = async ({ sport }: SportProps) => {
	const wikipediaExcerpt = await getWikipediaExcerpt(sport.page_name);

	return (
		<SportsOverview_Client sport={sport} wikipediaExcerpt={wikipediaExcerpt} />
	);
};

export default SportsOverview;
