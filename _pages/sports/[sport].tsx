import type {
	NextPage,
	GetStaticProps,
	InferGetStaticPropsType,
	GetStaticPaths,
} from "next";
import Head from "next/head";

import { Container, Grid, Title } from "@mantine/core";

import type { CountrySportsMedals, Games, Sport } from "@prisma/client";
import {
	getAllSports,
	getMedalsBySport,
	getSport,
	getSportEventCountByGame,
} from "lib/db";
import { getWikipediaExcerpt, getWikipediaUrl } from "lib/utils/wikipedia";

import SportsOverview from "app/sports/[sport]/_components/SportsOverview";
import SportsEventsChart from "app/sports/[sport]/_components/SportsEventsChart";
import SportsCountriesChart from "app/sports/[sport]/_components/SportsCountriesChart";
import BackButton from "components/layouts/BackButton";

export interface OlympicSportProps {
	sport: Sport;
	numEvents: Record<Games["game"], number>;
	countrySportsMedals: CountrySportsMedals[];
	wikipediaExcerpt: string;
}

export const getStaticProps: GetStaticProps<OlympicSportProps> = async ({
	params,
}) => {
	const sportId = params?.sport as string;

	const sport = await getSport({ sport: sportId });

	const countEvents = await getSportEventCountByGame({ sport: sportId });
	const numEvents = countEvents
		.reverse()
		.reduce(
			(acc, { game, _count: { sport: count } }) =>
				count ? { ...acc, [game]: count } : acc,
			{},
		);

	const countrySportsMedals = await getMedalsBySport({ sport: sportId });

	const wikipediaExcerpt = await getWikipediaExcerpt(
		getWikipediaUrl("sports", sport?.name),
	);

	return { props: { sport, numEvents, countrySportsMedals, wikipediaExcerpt } };
};

export const getStaticPaths: GetStaticPaths = async () => {
	const sports = await getAllSports();

	return { paths: sports.map((params) => ({ params })), fallback: false };
};

const OlympicSport: NextPage<
	InferGetStaticPropsType<typeof getStaticProps>
> = ({ sport, numEvents, countrySportsMedals, wikipediaExcerpt }) => {
	return (
		<>
			<Head>
				<title>{`Olympics Vis - ${sport.name}`}</title>
			</Head>
			<Container fluid sx={{ height: "100%" }}>
				<BackButton />
				<Grid mt={0}>
					<Grid.Col>
						<SportsOverview sport={sport} wikipediaExcerpt={wikipediaExcerpt} />
					</Grid.Col>
					<Grid.Col>
						<SportsEventsChart sport={sport} numEvents={numEvents} />
					</Grid.Col>
					<Grid.Col>
						<SportsCountriesChart countrySportsMedals={countrySportsMedals} />
					</Grid.Col>
				</Grid>
			</Container>
		</>
	);
};

export default OlympicSport;
