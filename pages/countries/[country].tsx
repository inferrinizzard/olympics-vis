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

import { Box, Container, Grid, Image, Title } from '@mantine/core';

import { Calendar, Hash } from 'tabler-icons-react';

import { ResponsiveBar } from '@nivo/bar';

import GridCell from 'components/grid/GridCell';
import StatCard from 'components/grid/StatCard';

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

	const countrySportsMedals = await prisma.countrySportsMedals.findMany({
		where: { country: countryId },
	});

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
	const { summer, winter } = medalTotals;
	const allGoldMedals = summer.gold + winter.gold;
	const allSilverMedals = summer.silver + winter.silver;
	const allBronzeMedals = summer.bronze + winter.bronze;

	return (
		<Container fluid sx={{ height: '100%' }}>
			<Grid
				sx={theme => ({
					height: '100%',
					backgroundColor: theme.colors.blue[3],
					borderRadius: '1rem',
				})}>
				<Grid.Col span={4} sx={{ height: '100%' }}>
					<GridCell sx={{ height: '100%' }}>
						<Title order={1}>{`${country.name} (${country.country})`}</Title>
						<div style={{ maxHeight: '50%' }}>
							<Image
								src={country.flag}
								alt={'NOC Flag for ' + country.country}
								fit={'scale-down' as 'contain'}
							/>
						</div>
						<Box sx={{ display: 'flex', columnGap: '1rem', flexShrink: 2, maxWidth: '100%' }}>
							<StatCard icon={<Calendar />} title={'First Games'} text={''} />
							<StatCard icon={<Hash />} title={'Total Medals'} text={''} />
							<StatCard icon={<Hash />} title={'Games Hosted'} text={''} />
						</Box>
					</GridCell>
				</Grid.Col>
				<Grid.Col span={8}>
					<GridCell>
						<Title order={2}>{'Medals'}</Title>
						<Title order={4}>{'Total'}</Title>
						<div style={{ display: 'flex', columnGap: '1rem' }}>
							<Title order={6}>{'Total'}</Title>
							<div>{allGoldMedals + allSilverMedals + allBronzeMedals}</div>
						</div>
						<div style={{ display: 'flex', columnGap: '1rem' }}>
							<Title order={6}>{'Split'}</Title>
							<div>{allGoldMedals}</div>
							<div>{allSilverMedals}</div>
							<div>{allBronzeMedals}</div>
						</div>

						<Title order={4}>{'Summer'}</Title>
						<div style={{ display: 'flex', columnGap: '1rem' }}>
							<Title order={6}>{'Total'}</Title>
							<div>{summer.gold + summer.silver + summer.bronze}</div>
						</div>
						<div style={{ display: 'flex', columnGap: '1rem' }}>
							<Title order={6}>{'Split'}</Title>
							<div>{summer.gold}</div>
							<div>{summer.silver}</div>
							<div>{summer.bronze}</div>
						</div>

						<Title order={4}>{'Winter'}</Title>
						<div style={{ display: 'flex', columnGap: '1rem' }}>
							<Title order={6}>{'Total'}</Title>
							<div>{winter.gold + winter.silver + winter.bronze}</div>
						</div>
						<div style={{ display: 'flex', columnGap: '1rem' }}>
							<Title order={6}>{'Split'}</Title>
							<div>{winter.gold}</div>
							<div>{winter.silver}</div>
							<div>{winter.bronze}</div>
						</div>
					</GridCell>
					<GridCell>
						<Title order={2}>{'Sports'}</Title>
						{'num medals per sport, ranked desc'}
					</GridCell>
					<GridCell>
						<Title order={2}>{'Medals per Game'}</Title>
						<div style={{ width: '100%', height: '30vh' }}>
							<ResponsiveBar
								data={countryMedals}
								keys={['bronze', 'silver', 'gold']}
								indexBy="game"
								margin={{ top: 20, bottom: 50, left: 30 }}
								valueScale={{ type: 'linear' }}
								indexScale={{ type: 'band' }}
								colors={{ scheme: 'nivo' }}
								axisBottom={{
									tickSize: 5,
									tickPadding: 5,
									tickRotation: 45,
									legend: '',
									legendPosition: 'middle',
									legendOffset: 32,
								}}
							/>
						</div>
					</GridCell>
				</Grid.Col>
			</Grid>
		</Container>
	);
};

export default OlympicNOC;
