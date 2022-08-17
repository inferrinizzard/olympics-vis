import { type NextPage } from 'next';
import type { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';

import { Box, Container, Grid, Image, Title, Text, Table } from '@mantine/core';

import { BuildingSkyscraper, Calendar, CalendarEvent, Hash, Run } from 'tabler-icons-react';

import { PrismaClient, Games, CountryMedals, Country, SportsEvent } from '@prisma/client';

import GridCell from 'components/grid/GridCell';
import StatCard from 'components/grid/StatCard';

export interface OlympicGameSeasonProps {
	game: Games;
	countryMedals: (CountryMedals & { country_detail: Country })[];
	sportEvents: SportsEvent[];
}

export const getStaticProps: GetStaticProps<OlympicGameSeasonProps> = async ({ params }) => {
	const prisma = new PrismaClient();

	const gamesTable = prisma.games.findFirst({ where: { game: params!.game as string } });
	const game = (await gamesTable)!;

	const countryMedals = await prisma.countryMedals.findMany({
		where: { game: params!.game as string },
		take: 10,
		include: { country_detail: true },
	});

	const sportEvents = await prisma.sportsEvent.findMany({
		where: { game: params!.game as string },
		// include: { sport_detail: true },
	});

	return {
		props: { game, countryMedals, sportEvents },
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
}) => {
	const { game: gameKey } = useRouter().query;

	return (
		<Container fluid>
			<Grid
				p="xs"
				sx={theme => ({
					backgroundColor: theme.colors.blue[3],
					borderRadius: '1rem',
				})}>
				<GridCell span={8} boxStyle={{ display: 'flex', justifyContent: 'space-between' }}>
					<Box sx={{ width: '75%', display: 'flex', flexDirection: 'column' }} m="xs">
						<Title order={1}>{`${game.year} ${
							game.season[0].toUpperCase() + game.season.slice(1)
						} Olympics`}</Title>
						<Title order={3}>{game.title}</Title>
						<Text sx={{ flexGrow: 1 }}>Description goes here</Text>
						<Box sx={{ display: 'flex', columnGap: '1rem', flexShrink: 2, maxWidth: '100%' }}>
							<StatCard icon={<BuildingSkyscraper />} title={'Host'} text={game.host} />
							<StatCard icon={<Calendar />} title={'Start Date'} text={game.start_date} />
							<StatCard icon={<CalendarEvent />} title={'End Date'} text={game.end_date} />
							<StatCard icon={<Run />} title={'Total Athletes'} text={game.num_athletes} />
							<StatCard icon={<Hash />} title={'Total Countries'} text={100} />
						</Box>
					</Box>
					<Box p="sm" sx={{ width: '25%' }}>
						<Image src={game.emblem} alt={'Olympic emblem for ' + gameKey} sx={{ width: '100%' }} />
					</Box>
				</GridCell>
				<GridCell span={4}>
					<Title order={2} p="xs">
						{'Medals Top 10'}
					</Title>
					<Table p="xs">
						<tbody>
							<tr>
								<td>Country</td>
								<td>Gold</td>
								<td>Silver</td>
								<td>Bronze</td>
								<td>Total</td>
							</tr>
							{Object.values(countryMedals)
								.slice(0, 10)
								.map(({ country, gold, silver, bronze, total, country_detail }) => (
									<tr key={country}>
										<td>
											<Image
												src={country_detail.flag}
												alt={country}
												width={30}
												sx={{ display: 'inline-block' }}
											/>
											<span>{country}</span>
										</td>
										<td>{gold}</td>
										<td>{silver}</td>
										<td>{bronze}</td>
										<td>{total}</td>
									</tr>
								))}
						</tbody>
					</Table>
				</GridCell>
				<GridCell span={4}>
					<Title order={2} m="sm">
						{'Sports'}
					</Title>
					<Container
						sx={{
							display: 'grid',
							gridTemplateColumns: '1fr 1fr 1fr',
							gridTemplateRows: '1fr 1fr 1fr',
						}}>
						{sportEvents.slice(0, 8).map(sport => (
							<div key={sport.sport}>
								<h5>{sport.sport}</h5>
							</div>
						))}
					</Container>
				</GridCell>
				<GridCell span={8}>
					<Title order={2} m="sm">
						{'Choropleth here'}
					</Title>
				</GridCell>
			</Grid>
		</Container>
	);
};

export default OlympicGameSeason;
