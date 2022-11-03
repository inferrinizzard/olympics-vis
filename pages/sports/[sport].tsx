import { type NextPage } from 'next';
import type { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';

import { PrismaClient, type CountrySportsMedals, type Games, type Sport } from '@prisma/client';

import { Container, Grid, Title } from '@mantine/core';

import { ResponsiveBar } from '@nivo/bar';

import SportsOverview from 'components/pages/sports/SportsOverview';
import GridCell from 'components/grid/GridCell';
import { sortByMedals } from 'pages/utils';
import SportsEventsChart from 'components/pages/sports/SportsEventsChart';

export interface OlympicSportProps {
	sport: Sport;
	numEvents: Record<Games['game'], number>;
	countrySportsMedals: CountrySportsMedals[];
}

export const getStaticProps: GetStaticProps<OlympicSportProps> = async ({ params }) => {
	const sportId = params!.sport as string;
	const prisma = new PrismaClient();

	const sport = (await prisma.sport.findFirst({ where: { sport: sportId } }))!;

	const countEvents = await prisma.sportsEvent.groupBy({
		by: ['game'],
		_count: { sport: true },
		where: { sport: sportId },
	});
	const numEvents = countEvents
		.reverse()
		.reduce(
			(acc, { game, _count: { sport: count } }) => (count ? { ...acc, [game]: count } : acc),
			{}
		);

	const countrySportsMedals = await prisma.countrySportsMedals.findMany({
		where: { sport: sportId },
	});

	return { props: { sport, numEvents, countrySportsMedals } };
};

export const getStaticPaths: GetStaticPaths = async () => {
	const prisma = new PrismaClient();

	const sports = await prisma.sport.findMany({ select: { sport: true } });

	return { paths: sports.map(params => ({ params })), fallback: false };
};

const OlympicSport: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
	sport,
	numEvents,
	countrySportsMedals,
}) => {
	const leadingCountries = countrySportsMedals.sort(sortByMedals).reverse().slice(0, 10);

	return (
		<Container fluid sx={{ height: '100%' }}>
			<Grid
				p="xs"
				sx={theme => ({
					marginTop: 0,
					backgroundColor: theme.colors.blue[3],
					borderRadius: '1rem',
				})}>
				<Grid.Col>
					<SportsOverview sport={sport} />
				</Grid.Col>
				<Grid.Col p={0}>
					<SportsEventsChart sport={sport} numEvents={numEvents} />
					<GridCell colour="red">
						<Title order={2}>{'Leading Countries'}</Title>
						<div style={{ width: '100%', height: '40vh' }}>
							<ResponsiveBar
								data={leadingCountries}
								keys={['bronze', 'silver', 'gold']}
								indexBy="country"
								margin={{ top: 20, bottom: 50, left: 30 }}
								valueScale={{ type: 'linear' }}
								indexScale={{ type: 'band' }}
								colors={{ scheme: 'nivo' }}
								axisBottom={{
									tickSize: 5,
									tickPadding: 5,
									tickRotation: 45,
									legend: '',
									legendPosition: 'middle',
									legendOffset: 32,
								}}
							/>
						</div>
					</GridCell>
				</Grid.Col>
			</Grid>
		</Container>
	);
};

export default OlympicSport;
