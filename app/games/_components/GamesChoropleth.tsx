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

interface GamesChoroplethProps {
	athleteCounts: Pick<ParticipationRecords, "country" | AthleteSex>[];
}

const GamesChoropleth: React.FC<GamesChoroplethProps> = ({ athleteCounts }) => {
	const countryData = athleteCounts.map(({ country, men, women }) => {
		const isoMatch = nocIsoLookup[country as keyof typeof nocIsoLookup];

		return {
			id: "iso" in isoMatch ? isoMatch.iso : country,
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
				{"Choropleth"}
			</Title>
			<Box h="40vh" w="100%">
				<ResponsiveChoropleth
					data={countryData}
					features={worldCountries.features}
					margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
					colors="nivo"
					domain={[0, domainMax]}
					unknownColor="#666666"
					label="properties.name"
					valueFormat=".2s"
					projectionTranslation={[0.5, 0.5]}
					projectionRotation={[0, 0, 0]}
					enableGraticule={true}
					graticuleLineColor="#dddddd"
					borderWidth={0.5}
					borderColor="#152538"
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

export default GamesChoropleth;
