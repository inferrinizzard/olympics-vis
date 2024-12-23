"use client";

import { Box, Title } from "@mantine/core";

import { type BarDatum, ResponsiveBar } from "@nivo/bar";

import GridCell from "components/layouts/sub-page/GridCell";

interface CountrySportsMedalsChartProps {
	data: BarDatum[];
	keys: string[];
}

const CountrySportsMedalsChart_Client = ({
	data,
	keys,
}: CountrySportsMedalsChartProps) => {
	if (!data.length) {
		return (
			<GridCell>
				<Title order={2}>{"Medals per Sport"}</Title>
				<Title order={6}>{"Has not earned any medals yet."}</Title>
			</GridCell>
		);
	}

	// TODO: limit initial view, expand to modal to see all
	// TODO: custom tooltip
	// TODO: controls for season
	// TODO: typing

	return (
		<GridCell>
			<Title order={2}>{"Medals per Sport"}</Title>
			<Box w="100%" h="30vh">
				<ResponsiveBar
					// Data
					data={data.filter((datum) => keys.some((key) => datum[key]))}
					keys={keys}
					indexBy="sport"
					// Scale
					valueScale={{ type: "linear" }}
					indexScale={{ type: "band" }}
					// Labelling
					enableLabel={false}
					enableTotals
					// Style
					margin={{ top: 20, bottom: 50, left: 30 }}
					colors={{ scheme: "nivo" }}
					// Axes
					axisBottom={{
						tickSize: 5,
						tickPadding: 5,
						tickRotation: 45,
						legend: "",
						legendPosition: "middle",
						legendOffset: 32,
					}}
				/>
			</Box>
		</GridCell>
	);
};

export default CountrySportsMedalsChart_Client;
