import { type NextPage } from 'next';
import { type GetStaticProps, type InferGetStaticPropsType, type GetStaticPaths } from 'next';

import { PrismaClient, Sport } from '@prisma/client';
import { Container, Grid, Image, Title } from '@mantine/core';
import GridCell from 'components/grid/GridCell';

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
					</GridCell>
				</Grid.Col>
			</Grid>
		</Container>
	);
};

export default OlympicSport;
