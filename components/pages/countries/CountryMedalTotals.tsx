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
		<GridCell colour="olympic-blue" variant="outline">
			<Title order={2}>{'Medals'}</Title>
			<Box sx={{ display: 'flex', columnGap: '1rem', justifyContent: 'space-evenly' }}>
				<Box sx={{ flexGrow: 1 }}>
					<Title order={4}>{'Summer'}</Title>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: '[gold] 1fr [silver] 1fr [bronze] 1fr',
							gridTemplateRows: '[medals] 1fr [counts] 1fr',
						}}>
						<Image
							height={'3rem'}
							width={'3rem'}
							src="https://upload.wikimedia.org/wikipedia/commons/1/15/Gold_medal.svg"
							alt="gold medal icon"
						/>
						<Image
							height={'3rem'}
							width={'3rem'}
							src="https://upload.wikimedia.org/wikipedia/commons/0/03/Silver_medal.svg"
							alt="silver medal icon"
						/>
						<Image
							height={'3rem'}
							width={'3rem'}
							src="https://upload.wikimedia.org/wikipedia/commons/5/52/Bronze_medal.svg"
							alt="bronze medal icon"
						/>
						<Title order={5}>{summer.gold}</Title>
						<Text>{summer.silver}</Text>
						<Text>{summer.bronze}</Text>
					</Box>
				</Box>
				<Box sx={{ flexGrow: 1 }}>
					<Title order={4}>{'Winter'}</Title>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: '[gold] 1fr [silver] 1fr [bronze] 1fr',
							gridTemplateRows: '[medals] 1fr [counts] 1fr',
						}}>
						<Image
							height={'3rem'}
							width={'3rem'}
							src="https://upload.wikimedia.org/wikipedia/commons/1/15/Gold_medal.svg"
							alt="gold medal icon"
						/>
						<Image
							height={'3rem'}
							width={'3rem'}
							src="https://upload.wikimedia.org/wikipedia/commons/0/03/Silver_medal.svg"
							alt="silver medal icon"
						/>
						<Image
							height={'3rem'}
							width={'3rem'}
							src="https://upload.wikimedia.org/wikipedia/commons/5/52/Bronze_medal.svg"
							alt="bronze medal icon"
						/>
						<Text>{winter.gold}</Text>
						<Text>{winter.silver}</Text>
						<Text>{winter.bronze}</Text>
					</Box>
				</Box>
				<Box sx={{ flexGrow: 1 }}>
					<Title order={4}>{'Total'}</Title>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: '[gold] 1fr [silver] 1fr [bronze] 1fr',
							gridTemplateRows: '[medals] 1fr [counts] 1fr',
						}}>
						<Image
							height={'3rem'}
							width={'3rem'}
							src="https://upload.wikimedia.org/wikipedia/commons/1/15/Gold_medal.svg"
							alt="gold medal icon"
						/>
						<Image
							height={'3rem'}
							width={'3rem'}
							src="https://upload.wikimedia.org/wikipedia/commons/0/03/Silver_medal.svg"
							alt="silver medal icon"
						/>
						<Image
							height={'3rem'}
							width={'3rem'}
							src="https://upload.wikimedia.org/wikipedia/commons/5/52/Bronze_medal.svg"
							alt="bronze medal icon"
						/>
						<Text>{allGoldMedals}</Text>
						<Text>{allSilverMedals}</Text>
						<Text>{allBronzeMedals}</Text>
					</Box>
				</Box>
			</Box>
		</GridCell>
	);
};

export default CountryMedalTotals;
