import { type NextPage } from 'next';
import { type GetStaticProps, type InferGetStaticPropsType, type GetStaticPaths } from 'next';

import { Country, MedalTotals, PrismaClient } from '@prisma/client';

import { Box, Container, Grid, Image, Title } from '@mantine/core';

import { Calendar, Hash } from 'tabler-icons-react';

import GridCell from 'components/grid/GridCell';
import StatCard from 'components/grid/StatCard';

export interface OlympicNOCProps {
	country: Country;
	medals: { summer: MedalTotals; winter: MedalTotals; total: MedalTotals };
}

export const getStaticProps: GetStaticProps<OlympicNOCProps> = async ({ params }) => {
	const prisma = new PrismaClient();

	const country = (await prisma.country.findFirst({
		where: { country: params!.country as string },
	}))!;

	const medalsRows = await prisma.medalTotals.findMany({
		where: { country: params!.country as string },
	});

	const zeroMedals = { gold: 0, silver: 0, bronze: 0, total: 0 };
	const medals = medalsRows.reduce((acc, cur) => ({ ...acc, [cur.season]: cur }), {
		summer: zeroMedals,
		winter: zeroMedals,
		total: zeroMedals,
	} as OlympicNOCProps['medals']);

	return { props: { country, medals } };
};

export const getStaticPaths: GetStaticPaths = async () => {
	const prisma = new PrismaClient();

	const countries = await prisma.country.findMany({ select: { country: true } });

	return { paths: countries.map(({ country }) => ({ params: { country } })), fallback: false };
};

const OlympicNOC: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
	country,
	medals,
}) => {
	return (
		<Container fluid sx={{ height: '100%' }}>
			<Grid sx={{ height: '100%' }}>
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
							<div>{medals.total.total}</div>
						</div>
						<div style={{ display: 'flex', columnGap: '1rem' }}>
							<Title order={6}>{'Split'}</Title>
							<div>{medals.total.gold}</div>
							<div>{medals.total.silver}</div>
							<div>{medals.total.bronze}</div>
						</div>

						<Title order={4}>{'Summer'}</Title>
						<div style={{ display: 'flex', columnGap: '1rem' }}>
							<Title order={6}>{'Total'}</Title>
							<div>{medals.summer.total}</div>
						</div>
						<div style={{ display: 'flex', columnGap: '1rem' }}>
							<Title order={6}>{'Split'}</Title>
							<div>{medals.summer.gold}</div>
							<div>{medals.summer.silver}</div>
							<div>{medals.summer.bronze}</div>
						</div>

						<Title order={4}>{'Winter'}</Title>
						<div style={{ display: 'flex', columnGap: '1rem' }}>
							<Title order={6}>{'Total'}</Title>
							<div>{medals.winter.total}</div>
						</div>
						<div style={{ display: 'flex', columnGap: '1rem' }}>
							<Title order={6}>{'Split'}</Title>
							<div>{medals.winter.gold}</div>
							<div>{medals.winter.silver}</div>
							<div>{medals.winter.bronze}</div>
						</div>
					</GridCell>
				</Grid.Col>
			</Grid>
		</Container>
	);
};

export default OlympicNOC;
