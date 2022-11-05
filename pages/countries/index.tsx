import { type NextPage } from 'next';
import { type GetStaticProps, type InferGetStaticPropsType } from 'next';

import { Country, Games, MedalTotals, PrismaClient } from '@prisma/client';

import { Box, Title } from '@mantine/core';

import { Bar } from '@nivo/bar';

import CardLink from 'components/layouts/CardLink';

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
			<Title order={1}>{'Countries'}</Title>
			<section>
				<Bar
					data={Object.values(countryMedals)}
					keys={[...new Set(medalTotals.map(({ country }) => country))]}
					indexBy="game"
					width={1150}
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
			</section>

			{Object.entries(NOCs).map(([nocType, nocs]) => (
				<section key={nocType}>
					<Title order={2}>{`${nocType} NOCs`}</Title>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
							gap: '1rem',
						}}>
						{nocs.map(country => (
							<CardLink
								key={country.country}
								img={country.flag}
								alt={'NOC Flag for ' + country.country}
								href={`/countries/${country.country}`}
								caption={country.country}
								secondary={country.name}
								imgStyles={{
									boxShadow:
										'1px 1px 8px 1px rgba(0, 0, 0, 0.05), -1px -1px 8px 1px rgba(0, 0, 0, 0.05)',
								}}
							/>
						))}
					</Box>
				</section>
			))}
		</>
	);
};

export default Countries;
