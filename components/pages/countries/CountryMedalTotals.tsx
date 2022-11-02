import { Box, Image, Title, Text } from '@mantine/core';

import { OlympicNOCProps } from 'pages/countries/[country]';
import GridCell from 'components/grid/GridCell';

type MedalTotals = OlympicNOCProps['medalTotals'];
interface CountryMedalTotalsProps extends MedalTotals {}

const CountryMedalTotals: React.FC<CountryMedalTotalsProps> = ({ summer, winter }) => {
	const allGoldMedals = summer.gold + winter.gold;
	const allSilverMedals = summer.silver + winter.silver;
	const allBronzeMedals = summer.bronze + winter.bronze;

	return (
		<GridCell colour="white">
			<Title order={2}>{'Medals'}</Title>
			<Box sx={{ display: 'flex', columnGap: '1rem', justifyContent: 'space-evenly' }}>
				<MedalSet title="Summer" {...summer} />
				<MedalSet title="Winter" {...winter} />
				<MedalSet
					title="Total"
					{...{ gold: allGoldMedals, silver: allSilverMedals, bronze: allBronzeMedals }}
				/>
			</Box>
		</GridCell>
	);
};

interface MedalSetProps extends Pick<MedalTotals[keyof MedalTotals], 'gold' | 'silver' | 'bronze'> {
	title: string;
}

const MedalSet: React.FC<MedalSetProps> = ({ title, gold, silver, bronze }) => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<Title order={4}>{title}</Title>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: '[gold] 1fr [silver] 1fr [bronze] 1fr',
					gridTemplateRows: '[medals] 1fr [counts] 1fr',
				}}>
				{[
					'https://upload.wikimedia.org/wikipedia/commons/1/15/Gold_medal.svg',
					'https://upload.wikimedia.org/wikipedia/commons/0/03/Silver_medal.svg',
					'https://upload.wikimedia.org/wikipedia/commons/5/52/Bronze_medal.svg',
				].map(url => {
					const medalType = url.replace(/^.+[/]/, '');
					return <Image key={medalType} height="3rem" width="3rem" src={url} alt={medalType} />;
				})}
				{[gold, silver, bronze].map(medal => (
					<Title order={5} key={`${title} ${medal}`}>
						{medal}
					</Title>
				))}
			</Box>
		</Box>
	);
};

export default CountryMedalTotals;
