import { type NextPage } from 'next';
import type { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';

import { Container, Grid } from '@mantine/core';

import axios from 'axios';
import { getRoute } from 'pages/api/_endpoint';

import { GamesMain, YearSeasonDetail } from 'pages/types';
import GridCell from 'components/GridCell';

export interface OlympicGameSeasonProps {
	game: YearSeasonDetail;
}

export const getStaticProps: GetStaticProps<OlympicGameSeasonProps> = ({ params }) =>
	axios
		.get(getRoute(['games', params!.year as string, 'season', params!.season as string]))
		.then(res => ({ props: { game: res.data } }));

export const getStaticPaths: GetStaticPaths = () =>
	axios.get(getRoute(['games'])).then(({ data }) => ({
		paths: Object.entries(data as GamesMain).reduce(
			(routes, [season, games]) => [
				...routes,
				...games.map((year: string) => ({ params: { season, year: parseInt(year).toString() } })),
			],
			[] as { params: { season: string; year: string } }[]
		),
		fallback: false,
	}));

const OlympicGameSeason: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ game }) => {
	const { year, season } = useRouter().query;

	return (
		<Container fluid>
			<Grid
				p="xs"
				sx={theme => ({
					backgroundColor: theme.colors.blue[3],
					borderRadius: '1rem',
				})}>
				<GridCell span={8}>
					<h1>{year}</h1>
					<h1>{season}</h1>
					<p>{`Host: ${game.host}`}</p>
					<p>{`Number of countries: ${game.countries.length}`}</p>
				</GridCell>
				<GridCell span={4} sx={{ aspectRatio: '1' }}>
					<h2>{'Medals Table here'}</h2>
				</GridCell>
				<GridCell span={4} sx={{ aspectRatio: '1' }}>
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
