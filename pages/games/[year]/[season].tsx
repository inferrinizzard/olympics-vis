import { type NextPage } from 'next';
import { type GetStaticProps, type InferGetStaticPropsType, type GetStaticPaths } from 'next';
import { useRouter } from 'next/router';

import axios from 'axios';

import { GamesMain, YearSeasonDetail } from '../../types';

export interface OlympicGameSeasonProps {
	game: YearSeasonDetail;
}

export const getStaticProps: GetStaticProps<OlympicGameSeasonProps> = ({ params }) =>
	axios
		.get(
			`https://olympicsapi.herokuapp.com/games/?year=${params!.year}-${
				params!.season === 'summer' ? 'S' : 'W'
			}`
		)
		.then(res => ({ props: { game: res.data } }));

export const getStaticPaths: GetStaticPaths = () =>
	axios.get('https://olympicsapi.herokuapp.com/games/').then(({ data }) => ({
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
		<>
			<h1>{year}</h1>
			<h1>{season}</h1>
			<p>{JSON.stringify(game)}</p>
		</>
	);
};

export default OlympicGameSeason;
