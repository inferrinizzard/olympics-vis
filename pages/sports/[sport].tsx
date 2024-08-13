import type {
	NextPage,
	GetStaticProps,
	InferGetStaticPropsType,
	GetStaticPaths,
} from "next";
import Head from "next/head";

import prisma from "src/db/prisma";
import type { CountrySportsMedals, Games, Sport } from "@prisma/client";

import { Container, Grid, Title } from "@mantine/core";

import SportsOverview from "components/pages/sports/SportsOverview";
import SportsEventsChart from "components/pages/sports/SportsEventsChart";
import SportsCountriesChart from "components/pages/sports/SportsCountriesChart";
import BackButton from "components/layouts/BackButton";
import { getWikipediaExcerpt, getWikipediaUrl } from "src/utils/wikipedia";

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

	const sport = await prisma.sport.findFirst({ where: { sport: sportId } });

	const countEvents = await prisma.sportsEvent.groupBy({
		by: ["game"],
		_count: { sport: true },
		where: { sport: sportId },
	});
	const numEvents = countEvents
		.reverse()
		.reduce(
			(acc, { game, _count: { sport: count } }) =>
				count ? { ...acc, [game]: count } : acc,
			{},
		);

	const countrySportsMedals = await prisma.countrySportsMedals.findMany({
		where: { sport: sportId },
	});

	const wikipediaExcerpt = await getWikipediaExcerpt(
		getWikipediaUrl("sports", sport?.name),
	);

	return { props: { sport, numEvents, countrySportsMedals, wikipediaExcerpt } };
};

export const getStaticPaths: GetStaticPaths = async () => {
	const sports = await prisma.sport.findMany({ select: { sport: true } });

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
