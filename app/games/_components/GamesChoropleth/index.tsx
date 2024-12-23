import type { GamesProps } from "types";

import GamesChoropleth_Client from "./client";
import { getAthletesByCountryForGames } from "./data";

const GamesChoropleth = async ({ games }: GamesProps) => {
	const athleteCounts = await getAthletesByCountryForGames({
		games: games.code,
	});

	return <GamesChoropleth_Client athleteCounts={athleteCounts} />;
};

export default GamesChoropleth;
