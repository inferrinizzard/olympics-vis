import type { GamesProps } from "types";

import GamesOverview_Server from "./server";
import { getNumCountriesAtGames } from "./data";

const GamesOverview = async ({ games }: GamesProps) => {
	const numCountriesAtGames = await getNumCountriesAtGames({
		games: games.code,
	});

	return (
		<GamesOverview_Server
			games={games}
			numCountries={numCountriesAtGames}
			pageName={games.page_name ?? ""}
		/>
	);
};

export default GamesOverview;
