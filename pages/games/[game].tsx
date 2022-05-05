import { type NextPage } from 'next';
import type { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';

import { Container, Grid, Image } from '@mantine/core';

import axios from 'axios';
import { getRoute } from 'pages/api/_endpoint';

import { GameDetail } from 'types/api';
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
					<div>
						<h1>{`${game.year} ${
							game.season[0].toUpperCase() + game.season.slice(1)
						} Olympics`}</h1>
						<h3>{game.title}</h3>
						<p>{`Host: ${game.host}`}</p>
						<p>{`Start: ${game.start}`}</p>
						<p>{`End: ${game.end}`}</p>
						<p>{`Number of countries: ${game.countries.length}`}</p>
						<p>{`Number of athletes: ${game.numAthletes}`}</p>
					</div>
					<div>
						<Image
							src={game.emblem}
							alt={'Olympic emblem for ' + gameKey}
							sx={{ width: '10rem' }}
						/>
					</div>
				</GridCell>
				<GridCell span={4}>
					<h2>{'Medals Table here'}</h2>
				</GridCell>
				<GridCell span={4}>
					<h2>{'Sports Table here'}</h2>
				</GridCell>
				<GridCell span={8}>
					<h2>{'Choropleth here'}</h2>
				</GridCell>
			</Grid>
		</Container>
	);
};

export default OlympicGameSeason;
