import type { GamesProps } from "types";

import GamesMedalsTable_Client from "./client";
import { getTopCountriesForGames } from "./data";

const GamesMedalsTable = async ({ games }: GamesProps) => {
	const countryStandings = await getTopCountriesForGames({ games: games.code });

	return <GamesMedalsTable_Client countryStandings={countryStandings} />;
};

export default GamesMedalsTable;
