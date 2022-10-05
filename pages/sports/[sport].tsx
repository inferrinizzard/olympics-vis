import { type NextPage } from 'next';
import type { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';

import { PrismaClient, Sport } from '@prisma/client';

import { Box, Container, Grid, Image, Title } from '@mantine/core';

import { Calendar, Hash, MapPin } from 'tabler-icons-react';

import GridCell from 'components/grid/GridCell';
import StatCard from 'components/grid/StatCard';

export interface OlympicSportProps {
	sport: Sport;
}

export const getStaticProps: GetStaticProps<OlympicSportProps> = async ({ params }) => {
	const prisma = new PrismaClient();

	const sport = (await prisma.sport.findFirst({ where: { sport: params!.sport as string } }))!;

	return { props: { sport } };
};

export const getStaticPaths: GetStaticPaths = async () => {
	const prisma = new PrismaClient();

	const sports = await prisma.sport.findMany({ select: { sport: true } });

	return { paths: sports.map(params => ({ params })), fallback: false };
};

const OlympicSport: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ sport }) => {
	return (
		<Container fluid sx={{ height: '100%' }}>
			<Grid
				sx={theme => ({
					height: '100%',
					backgroundColor: theme.colors.blue[3],
					borderRadius: '1rem',
				})}>
				<Grid.Col>
					<GridCell>
						<Title order={2}>{`${sport.name} (${sport.sport})`}</Title>
						<Image
							src={sport.icon}
							width={100}
							alt={sport.sport + ' sport icon'}
							// fit={'scale-down' as 'contain'}
						/>
						<Box sx={{ display: 'flex', columnGap: '1rem', flexShrink: 2, maxWidth: '100%' }}>
							<StatCard icon={<MapPin />} title={'Best Country'} text={'Country'} />
							<StatCard icon={<Calendar />} title={'First Games'} text={'games'} />
							<StatCard icon={<Hash />} title={'Number of Events'} text={100} />
						</Box>
					</GridCell>
				</Grid.Col>
			</Grid>
		</Container>
	);
};

export default OlympicSport;
