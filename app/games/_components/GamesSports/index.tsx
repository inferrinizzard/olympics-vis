import type { GamesProps } from "types";

import GamesSports_Server from "./server";
import { getSportsForGames } from "./data";

const GamesSports = async ({ games }: GamesProps) => {
	const sportsList = await getSportsForGames({ games: games.code });

	return <GamesSports_Server gamesCode={games.code} sportsList={sportsList} />;
};

export default GamesSports;
