"use client";

import { Box, Title } from "@mantine/core";

import { type BarDatum, ResponsiveBar } from "@nivo/bar";

import GridCell from "components/grid/GridCell";

interface CountryGamesMedalsChartProps {
	data: BarDatum[];
	keys: string[];
}

const CountryGamesMedalsChart_Client = ({
	data,
	keys,
}: CountryGamesMedalsChartProps) => {
	if (!data.length) {
		return (
			<GridCell>
				<Title order={2}>{"Medals per Game"}</Title>
				<Title order={6}>{"Has not earned any medals yet."}</Title>
			</GridCell>
		);
	}

	// TODO: limit initial view, expand to modal to see all
	// TODO: update games X label based on # of bars (only years + O/P/Y) if many
	// TODO: custom tooltip
	// TODO: controls for season, edition, year ?
	// TODO: typing

	return (
		<GridCell>
			<Title order={2}>{"Medals per Game"}</Title>
			<Box h="30vh" w="100%">
				<ResponsiveBar
					// Data
					data={data}
					keys={keys}
					indexBy="games"
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

export default CountryGamesMedalsChart_Client;
