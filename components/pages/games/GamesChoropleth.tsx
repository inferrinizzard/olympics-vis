import { Box, Title } from '@mantine/core';

import { ResponsiveChoropleth } from '@nivo/geo';
import worldCountries from 'resources/countries.min.geo.json';
import nocIsoLookup from 'resources/geo_noc_map.json';

import { type OlympicGameSeasonProps } from 'pages/games/[game]';
import GridCell from 'components/grid/GridCell';

interface GamesChoroplethProps {
	countryAthletes: OlympicGameSeasonProps['countryAthletes']['country_athletes'];
}

const GamesChoropleth: React.FC<GamesChoroplethProps> = ({ countryAthletes }) => {
	const countryData = Object.entries(countryAthletes).map(([id, value]) => ({
		id:
			(nocIsoLookup[id as keyof typeof nocIsoLookup] as { name: string; iso?: string })?.iso ?? id,
		value,
	}));

	return (
		<GridCell>
			<Title order={2} m="sm">
				{'Choropleth'}
			</Title>
			<Box h="40vh" w="100%">
				<ResponsiveChoropleth
					data={countryData}
					features={worldCountries.features}
					margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
					colors="nivo"
					domain={[0, Math.max(...Object.values(countryAthletes))]}
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
							anchor: 'bottom-left',
							direction: 'column',
							justify: true,
							translateX: 20,
							translateY: -100,
							itemsSpacing: 0,
							itemWidth: 94,
							itemHeight: 18,
							itemDirection: 'left-to-right',
							itemTextColor: '#444444',
							itemOpacity: 0.85,
							symbolSize: 18,
							effects: [
								{
									on: 'hover',
									style: {
										itemTextColor: '#000000',
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
