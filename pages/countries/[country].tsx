import { type NextPage } from 'next';
import { type GetStaticProps, type InferGetStaticPropsType, type GetStaticPaths } from 'next';

import {
	PrismaClient,
	type Country,
	type CountryAthletes,
	type CountryMedals,
	type CountrySportsMedals,
	type MedalTotals,
} from '@prisma/client';

import { Container, Grid, Title } from '@mantine/core';

import { ResponsiveBar } from '@nivo/bar';

import GridCell from 'components/grid/GridCell';
import CountryOverview from 'components/pages/countries/CountryOverview';
import CountryMedalTotals from 'components/pages/countries/CountryMedalTotals';
import CountryGamesMedalsChart from 'components/pages/countries/CountryGamesMedalsChart';
import CountrySportsMedalsChart from 'components/pages/countries/CountrySportsMedalsChart';

export interface OlympicNOCProps {
	country: Country;
	medalTotals: { summer: MedalTotals; winter: MedalTotals };
	countrySportsMedals: CountrySportsMedals[];
	countryMedals: CountryMedals[];
	countryAthletes: Pick<CountryAthletes, 'game'> & Record<'athletes', number>;
}

export const getStaticProps: GetStaticProps<OlympicNOCProps> = async ({ params }) => {
	const countryId = params!.country as string;
	const prisma = new PrismaClient();

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

	return { props: { country, medalTotals, countrySportsMedals, countryMedals, countryAthletes } };
};

export const getStaticPaths: GetStaticPaths = async () => {
	const prisma = new PrismaClient();

	const countries = await prisma.country.findMany({ select: { country: true } });

	return { paths: countries.map(({ country }) => ({ params: { country } })), fallback: false };
};

const OlympicNOC: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
	country,
	medalTotals,
	countrySportsMedals,
	countryMedals,
	countryAthletes,
}) => {
	return (
		<Container fluid sx={{ height: '100%' }}>
			<Grid
				sx={theme => ({
					marginTop: 0,
					height: '100%',
					borderRadius: '1rem',
				})}>
				<Grid.Col p={'0.25rem'} span={4} sx={{ height: '100%' }}>
					<CountryOverview country={country} />
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
	);
};

export default OlympicNOC;
