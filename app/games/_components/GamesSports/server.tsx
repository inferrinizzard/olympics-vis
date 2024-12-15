"use server";

import { Title } from "@mantine/core";

import type { GamesKey, SportKey } from "types/prisma";

import GridCell from "components/layouts/sub-page/GridCell";
import IconGrid from "components/layouts/sub-page/IconGrid";
import { getGameName } from "lib/utils/getGameName";

import GamesSportsModalButton from "./GamesSportsModalButton";

interface GamesSportsProps {
	gamesCode: GamesKey;
	sportsList: SportKey[];
}

const GamesSports_Server = ({ gamesCode, sportsList }: GamesSportsProps) => {
	const iconList = sportsList.map((sport) => ({ code: sport }));

	const buildIconImageProps = (sport: string) =>
		({
			dir: "sports",
			games: gamesCode,
			alt: `Icon for ${sport} at ${getGameName(gamesCode)}`,
		}) as const;

	return (
		<GridCell h="100%">
			<Title order={2} m="sm">
				{"Sports"}
			</Title>
			<IconGrid
				list={iconList}
				limit={9}
				buildImageProps={buildIconImageProps}
				endItem={
					<GamesSportsModalButton
						iconGrid={
							<IconGrid list={iconList} buildImageProps={buildIconImageProps} />
						}
					/>
				}
			/>
		</GridCell>
	);
};

export default GamesSports_Server;
