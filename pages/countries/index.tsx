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
	const activeNOCs = countries.filter(({ status }) => status === 'active');
	const specialNOCs = countries.filter(({ status }) => status === 'special');
	const historicNOCs = countries.filter(({ status }) => status === 'historic');

	const NOCs = { Active: activeNOCs, Special: specialNOCs, Historic: historicNOCs };

	return (
		<>
			<div>Countries</div>
			<main>
				{Object.entries(NOCs).map(([nocType, nocs]) => (
					<>
						<Title key={nocType} order={1}>{`${nocType} NOCs`}</Title>
						<section
							style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '1rem' }}>
							{nocs.map(country => (
								<div key={country.country}>
									<Link passHref href={`/countries/${country.country}`}>
										<Card sx={{ cursor: 'pointer' }}>
											<Image
												src={country.flag}
												alt={'NOC Flag for ' + country.country}
												sx={{ maxHeight: '20vh', margin: 'auto' }}
											/>
											<Title order={2}>{`${country.country}`}</Title>
											<Title order={5}>{`${country.name}`}</Title>
										</Card>
									</Link>
								</div>
							))}
						</section>
					</>
				))}
			</main>
		</>
	);
};

export default Countries;
