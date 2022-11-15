import { type NextPage } from 'next';
import { type GetStaticProps, type InferGetStaticPropsType, type GetStaticPaths } from 'next';
import Head from 'next/head';

import prisma from 'src/db/prisma';
import {
	type Country,
	type CountryAthletes,
	type CountryMedals,
	type CountrySportsMedals,
	type Games,
	type MedalTotals,
} from '@prisma/client';

import { Container, Grid } from '@mantine/core';

import CountryOverview from 'components/pages/countries/CountryOverview';
import CountryMedalTotals from 'components/pages/countries/CountryMedalTotals';
import CountryGamesMedalsChart from 'components/pages/countries/CountryGamesMedalsChart';
import CountrySportsMedalsChart from 'components/pages/countries/CountrySportsMedalsChart';
import BackButton from 'components/layouts/BackButton';
import { getWikipediaExcerpt, getWikipediaUrl } from 'src/utils/wikipedia';

export interface OlympicNOCProps {
	country: Country;
	medalTotals: { summer: MedalTotals; winter: MedalTotals };
	countrySportsMedals: CountrySportsMedals[];
	countryMedals: CountryMedals[];
	countryAthletes: Pick<CountryAthletes, 'game'> & Record<'athletes', number>;
	firstGames: Games['game'];
	wikipediaExcerpt: string;
}

export const getStaticProps: GetStaticProps<OlympicNOCProps> = async ({ params }) => {
	const countryId = params!.country as string;

	const country = (await prisma.country.findFirst({
		where: { country: countryId },
	}))!;

	const medalsRows = await prisma.medalTotals.findMany({
		where: { country: countryId },
	});

	const zeroMedals = { gold: 0, silver: 0, bronze: 0, total: 0, country: countryId } as Omit<
		MedalTotals,
		'season'
	>;
	const medalTotals = medalsRows.reduce((acc, cur) => ({ ...acc, [cur.season]: cur }), {
		summer: { ...zeroMedals, season: 'summer' },
		winter: { ...zeroMedals, season: 'winter' },
	});

	const countrySportsMedals = (
		await prisma.countrySportsMedals.findMany({
			where: { country: countryId },
		})
	).sort((a, b) => (a.gold + a.silver + a.bronze > b.gold + b.silver + b.bronze ? -1 : 1));

	const countryMedals = (
		await prisma.countryMedals.findMany({
			where: { country: countryId },
		})
	).reverse();

	const countryAthletes = (await prisma.$queryRaw`
		SELECT
			game,
			CAST(country_athletes->>${countryId} AS SMALLINT) AS athletes
		FROM country_athletes
		WHERE country_athletes.country_athletes ? ${countryId};
	`) as OlympicNOCProps['countryAthletes'];

	const firstGames =
		(await prisma.countryAttendance.findFirst({ where: { country: countryId } }))?.games?.[0] ??
		('' as Games['game']);

	const wikipediaExcerpt = await getWikipediaExcerpt(getWikipediaUrl('countries', country.name));

	return {
		props: {
			country,
			medalTotals,
			countrySportsMedals,
			countryMedals,
			countryAthletes,
			firstGames,
			wikipediaExcerpt,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const countries = await prisma.country.findMany({ select: { country: true } });

	return { paths: countries.map(({ country }) => ({ params: { country } })), fallback: false };
};

const OlympicNOC: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
	country,
	medalTotals,
	countrySportsMedals,
	countryMedals,
	countryAthletes,
	firstGames,
	wikipediaExcerpt,
}) => {
	const totalMedals = Object.values(medalTotals).reduce(
		(sum, { gold, silver, bronze }) => sum + gold + silver + bronze,
		0
	);

	const bestGames = countryMedals.reduce(
		({ bestTotal, bestGame }, { game, gold, silver, bronze }) => {
			const total = gold + silver + bronze;
			return {
				bestTotal: Math.max(total, bestTotal),
				bestGame: total > bestTotal ? game : bestGame,
			};
		},
		{ bestTotal: 0, bestGame: '' }
	).bestGame;

	const bestSport = countrySportsMedals.reduce(
		({ bestTotal, bestSport }, { sport, gold, silver, bronze }) => {
			const total = gold + silver + bronze;
			return {
				bestTotal: Math.max(total, bestTotal),
				bestSport: total > bestTotal ? sport : bestSport,
			};
		},
		{ bestTotal: 0, bestSport: '' }
	).bestSport;

	return (
		<>
			<Head>
				<title>{`Olympics Vis - ${country.name}`}</title>
			</Head>
			<Container fluid sx={{ height: '100%' }}>
				<BackButton />
				<Grid mt={0} h="100%" sx={{ borderRadius: '1rem' }}>
					<Grid.Col span={4} p={'0.25rem'} h="100%">
						<CountryOverview
							country={country}
							overviewData={{ firstGames, totalMedals, bestGames, bestSport }}
							wikipediaExcerpt={wikipediaExcerpt}
						/>
					</Grid.Col>
					<Grid.Col
						span={8}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							rowGap: '1rem',
							padding: '0.25rem 0.25rem 0.25rem 0.75rem',
						}}>
						<CountryMedalTotals {...medalTotals} />
						<CountrySportsMedalsChart
							data={countrySportsMedals}
							keys={['bronze', 'silver', 'gold']}
						/>
						<CountryGamesMedalsChart data={countryMedals} keys={['bronze', 'silver', 'gold']} />
					</Grid.Col>
				</Grid>
			</Container>
		</>
	);
};

export default OlympicNOC;
