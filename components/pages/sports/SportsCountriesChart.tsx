"use client";

import { Box, Title } from "@mantine/core";

import { ResponsiveBar } from "@nivo/bar";

import { type OlympicSportProps } from "_pages/sports/[sport]";
import GridCell from "components/grid/GridCell";
import { sortByMedals } from "lib/util";

interface SportsCountriesChartProps {
	countrySportsMedals: OlympicSportProps["countrySportsMedals"];
}

const SportsCountriesChart: React.FC<SportsCountriesChartProps> = ({
	countrySportsMedals,
}) => {
	const leadingCountries = countrySportsMedals
		.sort(sortByMedals)
		.reverse()
		.slice(0, 10);

	return (
		<GridCell>
			<Title order={2}>{"Leading Countries"}</Title>
			<Box h="40vh" w="100%">
				<ResponsiveBar
					data={leadingCountries}
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

export default SportsCountriesChart;
