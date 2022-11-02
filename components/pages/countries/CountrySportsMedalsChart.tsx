import { Title } from '@mantine/core';

import { type BarDatum, ResponsiveBar } from '@nivo/bar';

import GridCell from 'components/grid/GridCell';

interface CountrySportsMedalsChartProps {
	data: BarDatum[];
	keys: string[];
}

const CountrySportsMedalsChart: React.FC<CountrySportsMedalsChartProps> = ({ data, keys }) => {
	return (
		<GridCell colour="white">
			<Title order={2}>{'Medals per Sport'}</Title>
			<div style={{ width: '100%', height: '30vh' }}>
				<ResponsiveBar
					data={data}
					keys={keys}
					indexBy="sport"
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

export default CountrySportsMedalsChart;
