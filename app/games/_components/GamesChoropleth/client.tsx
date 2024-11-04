"use client";

import { Box, Title } from "@mantine/core";

import type { ParticipationRecords } from "@prisma/client";
import type { AthleteSex } from "types/prisma";

import { ResponsiveChoropleth } from "@nivo/geo";
import worldCountries from "resources/json/countries.min.geo.json";
import nocIsoLookup from "resources/json/geo_noc_map.json" assert {
	type: "json",
};

import GridCell from "components/grid/GridCell";

import { GamesChoroplethToolip } from "./GamesChoroplethTooltip";

interface GamesChoroplethProps {
	athleteCounts: Pick<ParticipationRecords, "country" | AthleteSex>[];
}

const GamesChoropleth_Client = ({ athleteCounts }: GamesChoroplethProps) => {
	const countryData = athleteCounts.map(({ country, men, women }) => {
		const isoMatch = nocIsoLookup[country as keyof typeof nocIsoLookup];

		return {
			id: isoMatch && "iso" in isoMatch ? isoMatch.iso : country,
			men,
			women,
			total: men + women,
		};
	});

	const domainMax = countryData.reduce(
		(max, { total }) => Math.max(max, total),
		0,
	);

	return (
		<GridCell>
			<Title order={2} m="sm">
				{"Athlete Participation"}
			</Title>
			<Box w="100%" style={{ aspectRatio: "16 / 9" }}>
				<ResponsiveChoropleth
					// Features
					features={worldCountries.features}
					projectionTranslation={[0.5, 0.5]}
					projectionRotation={[0, 0, 0]}
					// Data
					data={countryData}
					domain={[0, domainMax]}
					label="properties.name"
					value={(datum) => datum?.total}
					valueFormat=".0s"
					tooltip={GamesChoroplethToolip}
					// Style
					margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
					colors="nivo"
					unknownColor="#666666"
					// Misc
					enableGraticule={true}
					graticuleLineColor="#dddddd"
					borderWidth={0.5}
					borderColor="#152538"
					// Legend
					legends={[
						{
							anchor: "bottom-left",
							direction: "column",
							justify: true,
							translateX: 20,
							translateY: -100,
							itemsSpacing: 0,
							itemWidth: 94,
							itemHeight: 18,
							itemDirection: "left-to-right",
							itemTextColor: "#444444",
							itemOpacity: 0.85,
							symbolSize: 18,
							effects: [
								{
									on: "hover",
									style: {
										itemTextColor: "#000000",
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

export default GamesChoropleth_Client;
