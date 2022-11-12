import { useEffect, useState } from 'react';

import { type Country, type Games, type Sport } from '@prisma/client';

import { Box, Image, Title, Text } from '@mantine/core';
import { Calendar, Medal, Run, Trophy } from 'tabler-icons-react';

import GridCell from 'components/grid/GridCell';
import StatCard from 'components/grid/StatCard';
import { getWikipediaExcerpt, getWikipediaUrl } from 'src/utils/wikipedia';
import { getGameName } from 'src/util';

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
	const [description, setDescription] = useState('');

	useEffect(() => {
		getWikipediaExcerpt(getWikipediaUrl('countries', country.name)).then(setDescription);
	}, [country]);

	return (
		<GridCell bg="blue" h="100%" sx={theme => ({ color: theme.colors.blue[2] })}>
			<Title order={1}>{`${country.name} (${country.country})`}</Title>
			<Box mah="50%">
				<Image
					src={country.flag}
					height="12rem"
					alt={'NOC Flag for ' + country.country}
					fit="scale-down"
					p="md"
				/>
			</Box>
			<Box>
				<Text sx={{ color: 'white' }}>{description}</Text>
			</Box>
			<Box p="xs" sx={{ display: 'flex', rowGap: '1rem', flexDirection: 'column' }}>
				<StatCard Icon={Calendar} title={'First Games'} text={getGameName(firstGames)} />
				<StatCard Icon={Medal} title={'Total Medals'} text={`${totalMedals}`} />
				{/* <StatCard Icon={Home} title={'Games Hosted'} text={''} /> */}
				{bestGames && <StatCard Icon={Trophy} title={'Best Games'} text={getGameName(bestGames)} />}
				{bestSport && <StatCard Icon={Run} title={'Best Sport'} text={bestSport} />}
			</Box>
		</GridCell>
	);
};

export default CountryOverview;
