import { type NextPage } from 'next';
import type { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';

import { Box, Container, Grid, Image, Title, Text, Table } from '@mantine/core';

import { BuildingSkyscraper, Calendar, CalendarEvent, Hash, Run } from 'tabler-icons-react';

import axios from 'axios';
import { getRoute } from 'pages/api/_endpoint';

import type { CountryMedalsMap, GamesDetailRow } from 'types/api';
import GridCell from 'components/grid/GridCell';
import StatCard from 'components/grid/StatCard';

export interface OlympicGameSeasonProps {
	game: GamesDetailRow;
	countryMedals: CountryMedalsMap;
}

export const getStaticProps: GetStaticProps<OlympicGameSeasonProps> = ({ params }) =>
	Promise.all([
		axios.get(getRoute(['games', params!.game as string])),
		axios.get(getRoute(['medals', 'games', params!.game as string])),
	]).then(([gameRes, countryMedalsRes]) => ({
		props: { game: gameRes.data, countryMedals: countryMedalsRes.data },
	}));

export const getStaticPaths: GetStaticPaths = () =>
	axios.get(getRoute(['games'])).then(({ data }) => ({
		paths: (data as string[]).map(game => ({ params: { game } })),
		fallback: false,
	}));

const OlympicGameSeason: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
	game,
	countryMedals,
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
							<StatCard icon={<Calendar />} title={'Start Date'} text={game.start} />
							<StatCard icon={<CalendarEvent />} title={'End Date'} text={game.end} />
							<StatCard icon={<Run />} title={'Total Athletes'} text={game.numAthletes} />
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
							{Object.entries(countryMedals)
								.slice(0, 10)
								.map(([country, medals]) => (
									<tr key={country}>
										<td>{country}</td>
										<td>{medals.gold}</td>
										<td>{medals.silver}</td>
										<td>{medals.bronze}</td>
										<td>{medals.total}</td>
									</tr>
								))}
						</tbody>
					</Table>
				</GridCell>
				<GridCell span={4}>
					<Title order={2} m="sm">
						{'Sports Table here'}
					</Title>
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
