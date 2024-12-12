import type { SportProps } from "types";

import SportsOverview_Server from "./server";
import { getBestCountryForSport, getFirstGamesForSport } from "./data";

const SportsOverview = async ({ sport }: SportProps) => {
	const bestCountry = await getBestCountryForSport({ sport: sport.code });
	const firstGames = await getFirstGamesForSport({ sport: sport.code });
	// const numEvents;

	return (
		<SportsOverview_Server
			sport={sport}
			bestCountry={bestCountry}
			firstGames={firstGames}
			pageName={sport.page_name ?? ""}
		/>
	);
};

export default SportsOverview;
