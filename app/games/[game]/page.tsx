import type { NextPage } from "next";
import { Container, Grid, GridCol } from "@mantine/core";

import {
	getAllGames,
	getGames,
	// getSportEventsForGame,
	getSportsForGames,
} from "lib/db";
import { getWikipediaExcerpt, getWikipediaUrl } from "lib/utils/wikipedia";

import GamesChoropleth from "../_components/GamesChoropleth";
import GamesMedalsTable from "../_components/GamesMedalsTable";
import GamesOverview from "../_components/GamesOverview";
import GamesSports from "../_components/GamesSports";

export async function generateStaticParams() {
	const games = await getAllGames({ select: { code: true } });

	return games.map((params) => ({ params }));
}

const GamesPage: NextPage<{ params: { games: string } }> = async ({
	params: { games: gamesCode },
}) => {
	const games = await getGames({ games: gamesCode });

	if (!games) {
		return null;
	}

	const sports = await getSportsForGames({ games: gamesCode });

	const wikipediaExcerpt = await getWikipediaExcerpt(
		getWikipediaUrl(
			"games",
			`${games?.year} ${games?.season.slice(0, 1).toUpperCase()}${games?.season.slice(1)}`,
		),
	);

	return (
		<Container fluid style={{ height: "100%" }}>
			{/* <BackButton /> */}
			<Grid mt={0}>
				<GridCol span={8}>
					<GamesOverview games={games} wikipediaExcerpt={wikipediaExcerpt} />
				</GridCol>
				<GridCol span={4}>
					<GamesMedalsTable games={games} />
				</GridCol>
				<GridCol span={4}>
					<GamesSports sports={sports} />
				</GridCol>
				<GridCol span={8}>
					<GamesChoropleth games={games} />
				</GridCol>
			</Grid>
		</Container>
	);
};

export default GamesPage;
