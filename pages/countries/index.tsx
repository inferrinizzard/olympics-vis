import { type NextPage } from 'next';
import { type GetStaticProps, type InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { Country, PrismaClient } from '@prisma/client';

export interface CountriesProps {
	countries: Country[];
}

export const getStaticProps: GetStaticProps<CountriesProps> = async () => {
	const prisma = new PrismaClient();

	const countries = await prisma.country.findMany();

	return { props: { countries } };
};

const Countries: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ countries }) => {
	return (
		<>
			<div>Countries</div>
			{countries.map(country => (
				<div key={country.country}>
					<Link href={`/countries/${country.country}`}>{country.country}</Link>
				</div>
			))}
		</>
	);
};

export default Countries;
