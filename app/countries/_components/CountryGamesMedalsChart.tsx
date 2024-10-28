"use client";
import { type BarDatum, ResponsiveBar } from "@nivo/bar";

import { Box, Title } from "@mantine/core";

import GridCell from "components/grid/GridCell";

interface CountryGamesMedalsChartProps {
	data: BarDatum[];
	keys: string[];
}

const CountryGamesMedalsChart: React.FC<CountryGamesMedalsChartProps> = ({
	data,
	keys,
}) => {
	if (!data.length) {
		return (
			<GridCell>
				<Title order={2}>{"Medals per Game"}</Title>
				<Title order={6}>{"Has not earned any medals yet."}</Title>
			</GridCell>
		);
	}

	return (
		<GridCell>
			<Title order={2}>{"Medals per Game"}</Title>
			<Box h="30vh" w="100%">
				<ResponsiveBar
					data={data}
					keys={keys}
					indexBy="games"
					margin={{ top: 20, bottom: 50, left: 30 }}
					valueScale={{ type: "linear" }}
					indexScale={{ type: "band" }}
					colors={{ scheme: "nivo" }}
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

export default CountryGamesMedalsChart;
