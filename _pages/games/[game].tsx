import type {
	NextPage,
	GetStaticProps,
	InferGetStaticPropsType,
	GetStaticPaths,
} from "next";
import Head from "next/head";

import { Container, Grid } from "@mantine/core";

import type {
	Country,
	CountryAthletes,
	CountryMedals,
	Games,
	SportsEvent,
} from "@prisma/client";
import {
	getAllGames,
	getCountryAthletesForGames,
	getGames,
	getSportEventsForGame,
	getTopCountriesForGames,
} from "lib/db";

import GamesOverview from "components/pages/games/GamesOverview";
import GamesMedalsTable from "components/pages/games/GamesMedalsTable";
import GamesSports from "components/pages/games/GamesSports";
import GamesChoropleth from "components/pages/games/GamesChoropleth";
import BackButton from "components/layouts/BackButton";
import { getWikipediaExcerpt, getWikipediaUrl } from "lib/utils/wikipedia";
import { getGameName } from "lib/util";

export interface OlympicGameSeasonProps {
	game: Games;
	countryMedals: (CountryMedals & { country_detail: Country })[];
	sportEvents: SportsEvent[];
	countryAthletes: Omit<CountryAthletes, "country_athletes"> & {
		country_athletes: Record<string, number>;
	};
	wikipediaExcerpt: string;
}

export const getStaticProps: GetStaticProps<OlympicGameSeasonProps> = async ({
	params,
}) => {
	const gamesId = params?.game as string;

	const game = await getGames({ games: gamesId });

	const countryMedals = await getTopCountriesForGames({ games: gamesId });

	const sportEvents = await getSportEventsForGame({ games: gamesId });

	const countryAthletes = await getCountryAthletesForGames({ games: gamesId });

	const wikipediaExcerpt = await getWikipediaExcerpt(
		getWikipediaUrl(
			"games",
			`${game?.year} ${game?.season.slice(0, 1).toUpperCase()}${game?.season.slice(1)}`,
		),
	);

	return {
		props: {
			game,
			countryMedals,
			sportEvents,
			countryAthletes,
			wikipediaExcerpt,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const games = await getAllGames();

	return {
		paths: games.map(({ game }) => ({ params: { game } })),
		fallback: false,
	};
};

const OlympicGameSeason: NextPage<
	InferGetStaticPropsType<typeof getStaticProps>
> = ({
	game,
	countryMedals,
	sportEvents,
	countryAthletes: { country_athletes: countryAthletes },
	wikipediaExcerpt,
}) => {
	return (
		<>
			<Head>
				<title>{`Olympics Vis - ${getGameName(game.game)}`}</title>
			</Head>
			<Container fluid>
				<BackButton />
				<Grid mt={0}>
					<Grid.Col span={8}>
						<GamesOverview game={game} wikipediaExcerpt={wikipediaExcerpt} />
					</Grid.Col>
					<Grid.Col span={4}>
						<GamesMedalsTable countryMedals={countryMedals} />
					</Grid.Col>
					<Grid.Col span={4}>
						<GamesSports sportEvents={sportEvents} />
					</Grid.Col>
					<Grid.Col span={8}>
						<GamesChoropleth countryAthletes={countryAthletes} />
					</Grid.Col>
				</Grid>
			</Container>
		</>
	);
};

export default OlympicGameSeason;
