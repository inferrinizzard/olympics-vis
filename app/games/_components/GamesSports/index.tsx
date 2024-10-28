import type { GamesProps } from "types";

import GamesSports_Client from "./client";
import { getSportsForGames } from "./data";

const GamesSports = async ({ games }: GamesProps) => {
	const sportsList = await getSportsForGames({ games: games.code });

	return <GamesSports_Client sportsList={sportsList} />;
};

export default GamesSports;
