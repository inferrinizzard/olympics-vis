import { type NextPage } from 'next';
import type { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';

import { Box, Container, Grid, Image, Title } from '@mantine/core';

import { BuildingSkyscraper, Calendar, CalendarEvent, Hash, Run } from 'tabler-icons-react';

import axios from 'axios';
import { getRoute } from 'pages/api/_endpoint';

import { type GameDetail } from 'types/api';
import GridCell from 'components/grid/GridCell';
import StatCard from 'components/grid/StatCard';

export interface OlympicGameSeasonProps {
	game: GameDetail;
}

export const getStaticProps: GetStaticProps<OlympicGameSeasonProps> = ({ params }) =>
	axios
		.get(getRoute(['games', params!.game as string]))
		.then(res => ({ props: { game: res.data } }));

export const getStaticPaths: GetStaticPaths = () =>
	axios.get(getRoute(['games'])).then(({ data }) => ({
		paths: (data as string[]).map(game => ({ params: { game } })),
		fallback: false,
	}));

const OlympicGameSeason: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ game }) => {
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
					<Box sx={{ width: '75%' }}>
						<Title order={1} m="sm">{`${game.year} ${
							game.season[0].toUpperCase() + game.season.slice(1)
						} Olympics`}</Title>
						<Title order={3} m="xs">
							{game.title}
						</Title>
						<StatCard icon={<BuildingSkyscraper />} title={'Host'} text={game.host} />
						<StatCard icon={<Calendar />} title={'Start Date'} text={game.start} />
						<StatCard icon={<CalendarEvent />} title={'End Date'} text={game.end} />
						<StatCard icon={<Run />} title={'Total Athletes'} text={game.numAthletes} />
						<StatCard icon={<Hash />} title={'Total Countries'} text={game.countries.length} />
					</Box>
					<Box p="sm" sx={{ width: '25%' }}>
						<Image src={game.emblem} alt={'Olympic emblem for ' + gameKey} sx={{ width: '100%' }} />
					</Box>
				</GridCell>
				<GridCell span={4}>
					<Title order={2} m="sm">
						{'Medals Table here'}
					</Title>
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
