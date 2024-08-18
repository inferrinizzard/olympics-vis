"use client";

import { Box, Title } from "@mantine/core";

import { ResponsiveLine } from "@nivo/line";

import { type OlympicSportProps } from "_pages/sports/[sport]";
import GridCell from "components/grid/GridCell";

interface SportsEventsChartProps {
	sport: OlympicSportProps["sport"];
	numEvents: OlympicSportProps["numEvents"];
}

const SportsEventsChart: React.FC<SportsEventsChartProps> = ({
	sport,
	numEvents,
}) => {
	const eventCountData = [
		{
			id: sport.sport,
			data: Object.entries(numEvents).map(([game, count]) => ({
				x: game,
				y: count,
			})),
		},
	];

	return (
		<GridCell>
			<Title order={2}>{"Number of Events"}</Title>
			<Box h="40vh" w="100%">
				<ResponsiveLine
					data={eventCountData}
					margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
					xScale={{ type: "point" }}
					yScale={{
						type: "linear",
						min: 0,
						max: "auto",
						reverse: false,
					}}
					axisTop={null}
					axisRight={null}
					axisBottom={{
						tickSize: 5,
						tickPadding: 5,
						tickRotation: 45,
						legend: "Olympic Games",
						legendOffset: 36,
						legendPosition: "middle",
					}}
					axisLeft={{
						tickSize: 5,
						tickPadding: 5,
						tickRotation: 0,
						legend: "Number of Events",
						legendOffset: -40,
						legendPosition: "middle",
					}}
					pointSize={10}
					pointColor={{ theme: "background" }}
					pointBorderWidth={2}
					pointBorderColor={{ from: "serieColor" }}
					pointLabelYOffset={-12}
					useMesh={true}
					legends={[
						{
							anchor: "bottom-right",
							direction: "column",
							justify: false,
							translateX: 100,
							translateY: 0,
							itemsSpacing: 0,
							itemDirection: "left-to-right",
							itemWidth: 80,
							itemHeight: 20,
							itemOpacity: 0.75,
							symbolSize: 12,
							symbolShape: "circle",
							symbolBorderColor: "rgba(0, 0, 0, .5)",
							effects: [
								{
									on: "hover",
									style: {
										itemBackground: "rgba(0, 0, 0, .03)",
										itemOpacity: 1,
									},
								},
							],
						},
					]}
				/>
			</Box>
		</GridCell>
	);
};

export default SportsEventsChart;
