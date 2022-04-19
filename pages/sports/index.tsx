import { type NextPage } from 'next';
import { type GetStaticProps, type InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import axios from 'axios';
import { getRoute } from '../api/_endpoint';

export interface SportsProps {
	sports: string[];
}

export const getStaticProps: GetStaticProps<SportsProps> = () =>
	axios.get(getRoute(['sports'])).then(res => ({ props: { sports: res.data } }));

const Sports: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ sports }) => {
	return (
		<>
			<div>Sports</div>
			{sports.map(country => (
				<div key={country}>
					<Link href={`/sports/${country}`}>{country}</Link>
				</div>
			))}
		</>
	);
};

export default Sports;
