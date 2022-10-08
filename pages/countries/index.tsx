import { Fragment } from 'react';
import { type NextPage } from 'next';
import { type GetStaticProps, type InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { Country, Games, MedalTotals, PrismaClient } from '@prisma/client';

import { Card, Title, Image } from '@mantine/core';

import { Bar } from '@nivo/bar';

export interface CountriesProps {
	countries: Country[];
	medalTotals: (Pick<MedalTotals, 'country'> & Pick<Games, 'game' | 'year'> & { total: number })[];
}

export const getStaticProps: GetStaticProps<CountriesProps> = async () => {
	const prisma = new PrismaClient();

	const countries = await prisma.country.findMany();

	const medalTotals = (await prisma.$queryRaw`
		SELECT game, country, total
		FROM (
			SELECT
				last10games.game AS game,
				country,
				CAST(gold + silver + bronze AS SMALLINT) AS total,
				year,
				RANK() OVER (PARTITION BY last10games.game ORDER BY gold + silver + bronze DESC) AS num
			FROM country_game_medals
			JOIN (
				SELECT game, year
				FROM games_detail
				ORDER BY year DESC, season ASC
				LIMIT 10
			) last10games
			ON country_game_medals.game = last10games.game
		) ranked
		WHERE num <= 5
		ORDER BY year, total;
		`) as CountriesProps['medalTotals'];

	return { props: { countries, medalTotals } };
};

const Countries: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
	countries,
	medalTotals,
}) => {
	const activeNOCs = countries.filter(({ status }) => status === 'active');
	const specialNOCs = countries.filter(({ status }) => status === 'special');
	const historicNOCs = countries.filter(({ status }) => status === 'historic');

	const NOCs = { Active: activeNOCs, Special: specialNOCs, Historic: historicNOCs };

	const countryMedals = medalTotals.reduce((gameMap, { game, country, total }) => {
		return { ...gameMap, [game]: { game, ...(gameMap[game] ?? {}), [country]: total } };
	}, {} as Record<string, Record<string, string | number>>);

	return (
		<>
			<div>Countries</div>
			<main>
				<Bar
					data={Object.values(countryMedals)}
					keys={[...new Set(medalTotals.map(({ country }) => country))]}
					indexBy="game"
					width={1200}
					height={500}
					margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
					valueScale={{ type: 'linear' }}
					indexScale={{ type: 'band' }}
					colors={{ scheme: 'nivo' }}
					axisTop={{
						tickSize: 5,
						tickPadding: 5,
						tickRotation: 0,
						legend: '',
						legendPosition: 'middle',
						legendOffset: -36,
					}}
					axisBottom={{
						tickSize: 5,
						tickPadding: 5,
						tickRotation: 0,
						legend: '',
						legendPosition: 'middle',
						legendOffset: 32,
					}}
				/>

				{Object.entries(NOCs).map(([nocType, nocs]) => (
					<Fragment key={nocType}>
						<Title order={2}>{`${nocType} NOCs`}</Title>
						<section
							style={{
								display: 'grid',
								gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
								gap: '1rem',
							}}>
							{nocs.map(country => (
								<div key={country.country}>
									<Link passHref href={`/countries/${country.country}`}>
										<Card sx={{ cursor: 'pointer' }}>
											<Image
												src={country.flag}
												alt={'NOC Flag for ' + country.country}
												styles={{
													figure: { height: '100%', aspectRatio: '3 / 2' },
													imageWrapper: { height: '100%' },
												}}
												sx={{ height: '100%' }}
												imageProps={{ style: { height: '100%', objectFit: 'scale-down' } }}
											/>
											<Title order={2}>{`${country.country}`}</Title>
											<Title order={5}>{`${country.name}`}</Title>
										</Card>
									</Link>
								</div>
							))}
						</section>
					</Fragment>
				))}
			</main>
		</>
	);
};

export default Countries;
