"use client";

import { Bar } from "@nivo/bar";

import type { CountryKey, GamesKey } from "types/prisma";

import type { LeadingCountriesPerGames } from "./data";

interface TopMedalsChartProps {
	countryMedals: Record<GamesKey, Record<CountryKey, number>>;
	medalTotals: LeadingCountriesPerGames[];
}

const TopMedalsChart_Client = ({
	countryMedals,
	medalTotals,
}: TopMedalsChartProps) => {
	return (
		<section>
			<Bar
				data={Object.values(countryMedals)}
				keys={[...new Set(medalTotals.map(({ country }) => country))]}
				indexBy="games"
				width={1150}
				height={500}
				margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
				valueScale={{ type: "linear" }}
				indexScale={{ type: "band" }}
				colors={{ scheme: "nivo" }}
				axisTop={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: "",
					legendPosition: "middle",
					legendOffset: -36,
				}}
				axisBottom={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: "",
					legendPosition: "middle",
					legendOffset: 32,
				}}
			/>
		</section>
	);
};

export default TopMedalsChart_Client;
