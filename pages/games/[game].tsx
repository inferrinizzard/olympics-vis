import { type NextPage } from 'next';
import type { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';

import {
	PrismaClient,
	Games,
	CountryMedals,
	Country,
	SportsEvent,
	CountryAthletes,
} from '@prisma/client';

import worldCountries from 'resources/countries.min.geo.json';
import nocIsoLookup from 'resources/geo_noc_map.json';
import { ResponsiveChoropleth } from '@nivo/geo';

import { Container, Grid, Image, Title, Table } from '@mantine/core';

import GamesOverview from 'components/pages/games/GamesOverview';

import GridCell from 'components/grid/GridCell';
import BackButton from 'components/layouts/BackButton';
import GamesMedalsTable from 'components/pages/games/GamesMedalsTable';
import GamesSports from 'components/pages/games/GamesSports';

export interface OlympicGameSeasonProps {
	game: Games;
	countryMedals: (CountryMedals & { country_detail: Country })[];
	sportEvents: SportsEvent[];
	countryAthletes: Omit<CountryAthletes, 'country_athletes'> & {
		country_athletes: Record<string, number>;
	};
}

export const getStaticProps: GetStaticProps<OlympicGameSeasonProps> = async ({ params }) => {
	const prisma = new PrismaClient();

	const gamesTable = prisma.games.findFirst({ where: { game: params!.game as string } });
	const game = (await gamesTable)!;

	const countryMedals = await prisma.countryMedals.findMany({
		where: { game: params!.game as string },
		take: 10,
		include: { country_detail: true },
		orderBy: [{ gold: 'desc' }, { silver: 'desc' }, { bronze: 'desc' }],
	});

	const sportEvents = await prisma.sportsEvent.findMany({
		where: { game: params!.game as string },
		distinct: 'sport',
		// include: { sport_detail: true },
	});

	const countryAthletes = (await prisma.countryAthletes.findFirst({
		where: { game: params!.game as string },
	})) as OlympicGameSeasonProps['countryAthletes'];

	return {
		props: { game, countryMedals, sportEvents, countryAthletes },
	};
};

export const getStaticPaths: GetStaticPaths = () =>
	new PrismaClient().games.findMany({ select: { game: true } }).then(gameRows => ({
		paths: gameRows.map(({ game }) => ({ params: { game } })),
		fallback: false,
	}));

const OlympicGameSeason: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
	game,
	countryMedals,
	sportEvents,
	countryAthletes: { country_athletes: countryAthletes },
}) => {
	const countryData = Object.entries(countryAthletes).map(([id, value]) => ({
		id:
			(nocIsoLookup[id as keyof typeof nocIsoLookup] as { name: string; iso?: string })?.iso ?? id,
		value,
	}));

	return (
		<Container fluid>
			<BackButton />
			<Grid
				p="xs"
				sx={theme => ({
					marginTop: 0,
					backgroundColor: theme.colors.blue[3],
					borderRadius: '1rem',
				})}>
				<Grid.Col span={8}>
					<GamesOverview game={game} />
				</Grid.Col>
				<Grid.Col span={4}>
					<GamesMedalsTable countryMedals={countryMedals} />
				</Grid.Col>
				<Grid.Col span={4}>
					<GamesSports sportEvents={sportEvents} />
				</Grid.Col>
				<Grid.Col span={8}>
					<GridCell colour="green">
						<Title order={2} m="sm">
							{'Choropleth'}
						</Title>
						<div style={{ width: '100%', height: '40vh' }}>
							<ResponsiveChoropleth
								data={countryData}
								features={worldCountries.features}
								margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
								colors="nivo"
								domain={[
									0,
									Math.max(
										...Object.values(
											countryAthletes as OlympicGameSeasonProps['countryAthletes']['country_athletes']
										)
									),
								]}
								unknownColor="#666666"
								label="properties.name"
								valueFormat=".2s"
								projectionTranslation={[0.5, 0.5]}
								projectionRotation={[0, 0, 0]}
								enableGraticule={true}
								graticuleLineColor="#dddddd"
								borderWidth={0.5}
								borderColor="#152538"
								legends={[
									{
										anchor: 'bottom-left',
										direction: 'column',
										justify: true,
										translateX: 20,
										translateY: -100,
										itemsSpacing: 0,
										itemWidth: 94,
										itemHeight: 18,
										itemDirection: 'left-to-right',
										itemTextColor: '#444444',
										itemOpacity: 0.85,
										symbolSize: 18,
										effects: [
											{
												on: 'hover',
												style: {
													itemTextColor: '#000000',
													itemOpacity: 1,
												},
											},
										],
									},
								]}
							/>
						</div>
					</GridCell>
				</Grid.Col>
			</Grid>
		</Container>
	);
};

export default OlympicGameSeason;
