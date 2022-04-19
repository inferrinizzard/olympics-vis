import { type NextPage } from 'next';
import { type GetStaticProps, type InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import axios from 'axios';
import { getRoute } from 'pages/api/_endpoint';

export interface CountriesProps {
	countries: string[];
}

export const getStaticProps: GetStaticProps<CountriesProps> = () =>
	axios.get(getRoute(['countries'])).then(res => ({ props: { countries: res.data } }));

const Countries: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ countries }) => {
	return (
		<>
			<div>Countries</div>
			{countries.map(country => (
				<div key={country}>
					<Link href={`/countries/${country}`}>{country}</Link>
				</div>
			))}
		</>
	);
};

export default Countries;
