import { Title } from '@mantine/core';

import { OlympicNOCProps } from 'pages/countries/[country]';
import GridCell from 'components/grid/GridCell';

type MedalTotals = OlympicNOCProps['medalTotals'];
interface CountryMedalTotalsProps extends MedalTotals {}

const CountryMedalTotals: React.FC<CountryMedalTotalsProps> = ({ summer, winter }) => {
	const allGoldMedals = summer.gold + winter.gold;
	const allSilverMedals = summer.silver + winter.silver;
	const allBronzeMedals = summer.bronze + winter.bronze;

	return (
		<GridCell>
			<Title order={2}>{'Medals'}</Title>
			<Title order={4}>{'Total'}</Title>
			<div style={{ display: 'flex', columnGap: '1rem' }}>
				<Title order={6}>{'Total'}</Title>
				<div>{allGoldMedals + allSilverMedals + allBronzeMedals}</div>
			</div>
			<div style={{ display: 'flex', columnGap: '1rem' }}>
				<Title order={6}>{'Split'}</Title>
				<div>{allGoldMedals}</div>
				<div>{allSilverMedals}</div>
				<div>{allBronzeMedals}</div>
			</div>

			<Title order={4}>{'Summer'}</Title>
			<div style={{ display: 'flex', columnGap: '1rem' }}>
				<Title order={6}>{'Total'}</Title>
				<div>{summer.gold + summer.silver + summer.bronze}</div>
			</div>
			<div style={{ display: 'flex', columnGap: '1rem' }}>
				<Title order={6}>{'Split'}</Title>
				<div>{summer.gold}</div>
				<div>{summer.silver}</div>
				<div>{summer.bronze}</div>
			</div>

			<Title order={4}>{'Winter'}</Title>
			<div style={{ display: 'flex', columnGap: '1rem' }}>
				<Title order={6}>{'Total'}</Title>
				<div>{winter.gold + winter.silver + winter.bronze}</div>
			</div>
			<div style={{ display: 'flex', columnGap: '1rem' }}>
				<Title order={6}>{'Split'}</Title>
				<div>{winter.gold}</div>
				<div>{winter.silver}</div>
				<div>{winter.bronze}</div>
			</div>
		</GridCell>
	);
};

export default CountryMedalTotals;
