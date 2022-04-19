import { type NextPage } from 'next';
import { type GetStaticProps, type InferGetStaticPropsType, type GetStaticPaths } from 'next';
import { useRouter } from 'next/router';

import axios from 'axios';
import { getRoute } from 'pages/api/_endpoint';

import { GamesMain, YearSeasonDetail } from 'pages/types';

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
		<>
			<h1>{year}</h1>
			<h1>{season}</h1>
			<p>{JSON.stringify(game)}</p>
		</>
	);
};

export default OlympicGameSeason;
