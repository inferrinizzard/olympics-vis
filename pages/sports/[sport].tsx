import { type NextPage } from 'next';
import type { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';

import { Games, PrismaClient, Sport } from '@prisma/client';

import { Box, Container, Grid, Image, Title } from '@mantine/core';

import { Calendar, Hash, MapPin } from 'tabler-icons-react';

import { ResponsiveLine } from '@nivo/line';

import GridCell from 'components/grid/GridCell';
import StatCard from 'components/grid/StatCard';

export interface OlympicSportProps {
	sport: Sport;
	numEvents: Record<Games['game'], number>;
}

export const getStaticProps: GetStaticProps<OlympicSportProps> = async ({ params }) => {
	const prisma = new PrismaClient();

	const sport = (await prisma.sport.findFirst({ where: { sport: params!.sport as string } }))!;

	const countEvents = await prisma.sportsEvent.groupBy({
		by: ['game'],
		_count: { sport: true },
		where: { sport: params!.sport as string },
	});
	const numEvents = countEvents
		.reverse()
		.reduce(
			(acc, { game, _count: { sport: count } }) => (count ? { ...acc, [game]: count } : acc),
			{}
		);

	return { props: { sport, numEvents } };
};

export const getStaticPaths: GetStaticPaths = async () => {
	const prisma = new PrismaClient();

	const sports = await prisma.sport.findMany({ select: { sport: true } });

	return { paths: sports.map(params => ({ params })), fallback: false };
};

const OlympicSport: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
	sport,
	numEvents,
}) => {
	const eventCountData = [
		{
			id: sport.sport,
			data: Object.entries(numEvents).map(([game, count]) => ({ x: game, y: count })),
		},
	];

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
					<GridCell>
						<Title order={2}>{'Number of Events'}</Title>
						<div style={{ width: '100%', height: '40vh' }}>
							<ResponsiveLine
								data={eventCountData}
								margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
								xScale={{ type: 'point' }}
								yScale={{
									type: 'linear',
									min: 0,
									max: 'auto',
									reverse: false,
								}}
								axisTop={null}
								axisRight={null}
								axisBottom={{
									tickSize: 5,
									tickPadding: 5,
									tickRotation: 45,
									legend: 'Olympic Games',
									legendOffset: 36,
									legendPosition: 'middle',
								}}
								axisLeft={{
									tickSize: 5,
									tickPadding: 5,
									tickRotation: 0,
									legend: 'Number of Events',
									legendOffset: -40,
									legendPosition: 'middle',
								}}
								pointSize={10}
								pointColor={{ theme: 'background' }}
								pointBorderWidth={2}
								pointBorderColor={{ from: 'serieColor' }}
								pointLabelYOffset={-12}
								useMesh={true}
								legends={[
									{
										anchor: 'bottom-right',
										direction: 'column',
										justify: false,
										translateX: 100,
										translateY: 0,
										itemsSpacing: 0,
										itemDirection: 'left-to-right',
										itemWidth: 80,
										itemHeight: 20,
										itemOpacity: 0.75,
										symbolSize: 12,
										symbolShape: 'circle',
										symbolBorderColor: 'rgba(0, 0, 0, .5)',
										effects: [
											{
												on: 'hover',
												style: {
													itemBackground: 'rgba(0, 0, 0, .03)',
													itemOpacity: 1,
												},
											},
										],
									},
								]}
							/>
						</div>
					</GridCell>
				</Grid.Col>
			</Grid>
		</Container>
	);
};

export default OlympicSport;
