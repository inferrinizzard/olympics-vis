import type { NextPage } from "next";

import { Container, Grid, GridCol } from "@mantine/core";

import type { MetadataProps } from "types/next";

import {
	getAllGames,
	getGames,
	// getSportEventsForGame,
} from "lib/db";
import { getGameName } from "lib/utils/getGameName";

import GamesChoropleth from "../_components/GamesChoropleth";
import GamesMedalsTable from "../_components/GamesMedalsTable";
import GamesOverview from "../_components/GamesOverview";
import GamesSports from "../_components/GamesSports";

import * as classes from "../../common.css";

type GamesParams = { games: string };

export async function generateStaticParams() {
	const games = await getAllGames({ select: { code: true } });

	return games.map(({ code }) => ({ params: { games: code } }));
}

export const generateMetadata = async ({
	params,
}: MetadataProps<GamesParams>) => {
	return { title: getGameName((await params).games) };
};

const GamesPage: NextPage<{ params: GamesParams }> = async ({
	params: { games: gamesCode },
}) => {
	const games = await getGames({ games: decodeURIComponent(gamesCode) });

	if (!games) {
		return null;
	}

	return (
		<Container fluid h="100%" p="xs">
			<Grid mt={0}>
				<GridCol span={8} className={classes.GridCol}>
					<GamesOverview games={games} />
				</GridCol>
				<GridCol span={4} className={classes.GridCol}>
					<GamesMedalsTable games={games} />
				</GridCol>
				<GridCol span={4} className={classes.GridCol}>
					<GamesSports games={games} />
				</GridCol>
				<GridCol span={8} className={classes.GridCol}>
					<GamesChoropleth games={games} />
				</GridCol>
			</Grid>
		</Container>
	);
};

export default GamesPage;
