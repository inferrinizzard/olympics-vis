import { type NextPage } from 'next';
import { type GetStaticProps, type InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { Country, PrismaClient } from '@prisma/client';

import { Card, Title, Image } from '@mantine/core';

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
			<main style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '1rem' }}>
				{countries.map(country => (
					<div key={country.country}>
						<Link passHref href={`/countries/${country.country}`}>
							<Card sx={{ cursor: 'pointer' }}>
								<Title order={2} sx={{ display: 'inline-block' }}>{`${country.country}`}</Title>
								<Image
									src={country.flag}
									alt={'NOC Flag for ' + country.country}
									sx={{ maxHeight: '20vh', margin: 'auto', display: 'inline-block' }}
								/>
								<Title order={5}>{`${country.name}`}</Title>
							</Card>
						</Link>
					</div>
				))}
			</main>
		</>
	);
};

export default Countries;
