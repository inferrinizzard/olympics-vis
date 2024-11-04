import type { NextPage } from "next";
import { Container, Grid, GridCol } from "@mantine/core";

import {
	getAllGames,
	getGames,
	// getSportEventsForGame,
} from "lib/db";
import { getWikipediaExcerpt } from "lib/utils/wikipedia";

import GamesChoropleth from "../_components/GamesChoropleth";
import GamesMedalsTable from "../_components/GamesMedalsTable";
import GamesOverview from "../_components/GamesOverview";
import GamesSports from "../_components/GamesSports";

export async function generateStaticParams() {
	const games = await getAllGames({ select: { code: true } });

	return games.map(({ code }) => ({ params: { games: code } }));
}

const GamesPage: NextPage<{ params: { games: string } }> = async ({
	params: { games: gamesCode },
}) => {
	const games = await getGames({ games: gamesCode });

	if (!games) {
		return null;
	}

	return (
		<Container fluid h="100%" p="xs">
			<Grid mt={0}>
				<GridCol span={8}>
					<GamesOverview games={games} />
				</GridCol>
				<GridCol span={4}>
					<GamesMedalsTable games={games} />
				</GridCol>
				<GridCol span={4}>
					<GamesSports games={games} />
				</GridCol>
				<GridCol span={8}>
					<GamesChoropleth games={games} />
				</GridCol>
			</Grid>
		</Container>
	);
};

export default GamesPage;
