import type { NextPage } from "next";

import { Container, Grid, GridCol } from "@mantine/core";

import {
	getAllGames,
	getAthletesByCountryForGames,
	getGames,
	// getSportEventsForGame,
	getSportsForGames,
	getTopCountriesForGames,
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

const GamesPage: NextPage<
	Awaited<ReturnType<typeof generateStaticParams>>[number]
> = async ({ params: { code: gamesCode } }) => {
	const game = await getGames({ games: gamesCode });

	if (!game) {
		return null;
	}

	const countryMedals = await getTopCountriesForGames({ games: gamesCode });

	// const sportEvents = await getSportEventsForGame({ games: gamesCode });

	const sports = await getSportsForGames({ games: gamesCode });

	const athleteCounts = await getAthletesByCountryForGames({
		games: gamesCode,
	});

	const wikipediaExcerpt = await getWikipediaExcerpt(
		getWikipediaUrl(
			"games",
			`${game?.year} ${game?.season.slice(0, 1).toUpperCase()}${game?.season.slice(1)}`,
		),
	);

	return (
		<Container fluid style={{ height: "100%" }}>
			{/* <BackButton /> */}
			<Grid mt={0}>
				<GridCol span={8}>
					<GamesOverview game={game} wikipediaExcerpt={wikipediaExcerpt} />
				</GridCol>
				<GridCol span={4}>
					<GamesMedalsTable countryMedals={countryMedals} />
				</GridCol>
				<GridCol span={4}>
					<GamesSports sports={sports} />
				</GridCol>
				<GridCol span={8}>
					{athleteCounts ? (
						<GamesChoropleth athleteCounts={athleteCounts} />
					) : null}
				</GridCol>
			</Grid>
		</Container>
	);
};

export default GamesPage;
