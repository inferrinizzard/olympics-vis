import { type Country, type Games, type Sport } from '@prisma/client';

import { Box, Image, Title } from '@mantine/core';
import { Calendar, Hash, Run } from 'tabler-icons-react';

import GridCell from 'components/grid/GridCell';
import StatCard from 'components/grid/StatCard';

interface CountryOverviewData {
	firstGames: Games['game'];
	totalMedals: number;
	hostedGames?: Games['game'][];
	bestGames: Games['game'];
	bestSport: Sport['sport'];
}

interface CountryOverviewProps {
	country: Country;
	overviewData: CountryOverviewData;
}

const CountryOverview: React.FC<CountryOverviewProps> = ({
	country,
	overviewData: { firstGames, totalMedals, hostedGames, bestGames, bestSport },
}) => {
	return (
		<GridCell bg="blue" h="100%" sx={theme => ({ color: theme.colors.blue[2] })}>
			<Title order={1}>{`${country.name} (${country.country})`}</Title>
			<Box mah="50%">
				<Image
					src={country.flag}
					alt={'NOC Flag for ' + country.country}
					fit={'scale-down' as 'contain'}
				/>
			</Box>
			<Box p="xs" sx={{ display: 'flex', rowGap: '1rem', flexDirection: 'column' }}>
				<StatCard Icon={Calendar} title={'First Games'} text={firstGames} />
				<StatCard Icon={Hash} title={'Total Medals'} text={`${totalMedals}`} />
				<StatCard Icon={Hash} title={'Games Hosted'} text={''} />
				{bestGames && <StatCard Icon={Calendar} title={'Best Games'} text={bestGames} />}
				{bestSport && <StatCard Icon={Run} title={'Best Sport'} text={bestSport} />}
			</Box>
		</GridCell>
	);
};

export default CountryOverview;
