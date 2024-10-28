"use client";

import { Box, Title } from "@mantine/core";
import { ResponsiveBar } from "@nivo/bar";

import type { SportProps } from "types";

import GridCell from "components/grid/GridCell";
import type { SportCodeParam } from "lib/db";

/** Get countries that have medals in a sport */
export const getCountriesWithMedals = async ({ sport }: SportCodeParam) =>
	prisma.participationRecords
		.groupBy({
			by: "country",
			_sum: { gold: true, silver: true, bronze: true },
			where: { sport },
			orderBy: {
				_sum: { gold: "desc", silver: "desc", bronze: "desc" },
				country: "desc",
			},
		})
		.then((res) =>
			res.map(({ country, _sum: { gold, silver, bronze } }) => ({
				country,
				gold: gold ?? 0,
				silver: silver ?? 0,
				bronze: bronze ?? 0,
			})),
		);

const SportsCountriesChart = async ({ sport }: SportProps) => {
	const leadingCountries = (
		await getCountriesWithMedals({ sport: sport.code })
	).slice(0, 10);

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
