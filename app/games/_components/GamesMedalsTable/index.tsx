import type { GamesProps } from "types";

import GamesMedalsTable_Server from "./server";
import { getTopCountriesForGames } from "./data";

const GamesMedalsTable = async ({ games }: GamesProps) => {
	const countryStandings = await getTopCountriesForGames({ games: games.code });

	return <GamesMedalsTable_Server countryStandings={countryStandings} />;
};

export default GamesMedalsTable;
