import { type NextPage } from 'next';
import { type GetStaticProps, type InferGetStaticPropsType, type GetStaticPaths } from 'next';
import { useRouter } from 'next/router';

import axios from 'axios';
import { getRoute } from 'pages/api/_endpoint';

import { SportDetail } from 'types/api';

export interface OlympicSportProps {
	sport: SportDetail;
}

export const getStaticProps: GetStaticProps<OlympicSportProps> = ({ params }) =>
	axios
		.get(getRoute(['sports', params!.sport as string]))
		.then(res => ({ props: { sport: res.data } }));

export const getStaticPaths: GetStaticPaths = () =>
	axios.get(getRoute(['sports'])).then(({ data }) => ({
		paths: data.map((sport: string) => ({ params: { sport } })),
		fallback: false,
	}));

const OlympicSport: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ sport }) => {
	const { year, season } = useRouter().query;

	return (
		<>
			<h1>{year}</h1>
			<h1>{season}</h1>
			<p>{JSON.stringify(sport)}</p>
		</>
	);
};

export default OlympicSport;
