import { type NextPage } from 'next';
import { type GetStaticProps, type InferGetStaticPropsType, type GetStaticPaths } from 'next';

import { Country, PrismaClient } from '@prisma/client';

import { Box, Container, Grid, Title } from '@mantine/core';

import { Calendar, Hash } from 'tabler-icons-react';

import GridCell from 'components/grid/GridCell';
import StatCard from 'components/grid/StatCard';

export interface OlympicNOCProps {
	country: Country;
}

export const getStaticProps: GetStaticProps<OlympicNOCProps> = async ({ params }) => {
	const prisma = new PrismaClient();

	const country = (await prisma.country.findFirst({
		where: { country: params!.country as string },
	}))!;

	return { props: { country } };
};

export const getStaticPaths: GetStaticPaths = async () => {
	const prisma = new PrismaClient();

	const countries = await prisma.country.findMany({ select: { country: true } });

	return { paths: countries.map(({ country }) => ({ params: { country } })), fallback: false };
};

const OlympicNOC: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ country }) => {
	return (
		<Container fluid>
			<Grid>
				<GridCell span={8}>
					<Title order={1}>{`${country.name} (${country.country})`}</Title>
					<Box sx={{ display: 'flex', columnGap: '1rem', flexShrink: 2, maxWidth: '100%' }}>
						<StatCard icon={<Calendar />} title={'First Games'} text={''} />
						<StatCard icon={<Hash />} title={'Total Medals'} text={''} />
						<StatCard icon={<Hash />} title={'Games Hosted'} text={''} />
					</Box>
				</GridCell>
				<GridCell span={4}></GridCell>
			</Grid>
		</Container>
	);
};

export default OlympicNOC;
