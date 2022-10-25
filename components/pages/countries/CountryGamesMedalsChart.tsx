import { type BarDatum, ResponsiveBar } from '@nivo/bar';

import { Title } from '@mantine/core';

import GridCell from 'components/grid/GridCell';

interface CountryGamesMedalsChartProps {
	data: BarDatum[];
	keys: string[];
}

const CountryGamesMedalsChart: React.FC<CountryGamesMedalsChartProps> = ({ data, keys }) => {
	return (
		<GridCell>
			<Title order={2}>{'Medals per Game'}</Title>
			<div style={{ width: '100%', height: '30vh' }}>
				<ResponsiveBar
					data={data}
					keys={keys}
					indexBy="game"
					margin={{ top: 20, bottom: 50, left: 30 }}
					valueScale={{ type: 'linear' }}
					indexScale={{ type: 'band' }}
					colors={{ scheme: 'nivo' }}
					axisBottom={{
						tickSize: 5,
						tickPadding: 5,
						tickRotation: 45,
						legend: '',
						legendPosition: 'middle',
						legendOffset: 32,
					}}
				/>
			</div>
		</GridCell>
	);
};

export default CountryGamesMedalsChart;
