import { type NextPage } from 'next';
import { type GetStaticProps, type InferGetStaticPropsType, type GetStaticPaths } from 'next';
import { useRouter } from 'next/router';

import axios from 'axios';
import { getRoute } from '../api/_endpoint';

import { CountryDetail } from '../types';

export interface OlympicNOCProps {
	country: CountryDetail;
}

export const getStaticProps: GetStaticProps<OlympicNOCProps> = ({ params }) =>
	axios
		.get(getRoute(['countries', params!.country as string]))
		.then(res => ({ props: { country: res.data } }));

export const getStaticPaths: GetStaticPaths = () =>
	axios.get(getRoute(['countries'])).then(({ data }) => ({
		paths: data.map((country: string) => ({ params: { country } })),
		fallback: false,
	}));

const OlympicNOC: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ country }) => {
	const { year, season } = useRouter().query;

	return (
		<>
			<h1>{year}</h1>
			<h1>{season}</h1>
			<p>{JSON.stringify(country)}</p>
		</>
	);
};

export default OlympicNOC;
