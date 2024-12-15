"use server";

import { Title } from "@mantine/core";

import type { GamesKey, SportKey } from "types/prisma";

import GridCell from "components/layouts/sub-page/GridCell";
import IconGrid from "components/layouts/sub-page/IconGrid";
import { getGameName } from "lib/utils/getGameName";

interface GamesSportsProps {
	gamesCode: GamesKey;
	sportsList: SportKey[];
}

const GamesSports_Server = ({ gamesCode, sportsList }: GamesSportsProps) => {
	return (
		<GridCell h="100%">
			<Title order={2} m="sm">
				{"Sports"}
			</Title>
			<IconGrid
				list={sportsList.map((sport) => ({ code: sport }))}
				limit={8}
				buildImageProps={(sport: string) => ({
					dir: "sports",
					games: gamesCode,
					alt: `Icon for ${sport} at ${getGameName(gamesCode)}`,
				})}
			/>
		</GridCell>
	);
};

export default GamesSports_Server;
