"use client";

import { Box, Title } from "@mantine/core";
import { ResponsiveBar } from "@nivo/bar";

import GridCell from "components/grid/GridCell";

import type { CountriesWithMedals } from "./data";

interface SportCountriesChartProps {
	leadingCountries: CountriesWithMedals[];
}

const SportsCountriesChart_Client = ({
	leadingCountries,
}: SportCountriesChartProps) => {
	return (
		<GridCell>
			<Title order={2}>{"Leading Countries"}</Title>
			<Box h="40vh" w="100%">
				<ResponsiveBar
					data={leadingCountries.slice(0, 10)}
					keys={["bronze", "silver", "gold"]}
					indexBy="country"
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

export default SportsCountriesChart_Client;
