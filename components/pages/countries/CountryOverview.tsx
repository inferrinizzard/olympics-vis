import { type Country, type Games, type Sport } from '@prisma/client';

import { Box, Image, Title } from '@mantine/core';

import Calendar from 'tabler-icons-react/dist/icons/calendar';
import Medal from 'tabler-icons-react/dist/icons/medal';
import Run from 'tabler-icons-react/dist/icons/run';
import Trophy from 'tabler-icons-react/dist/icons/trophy';

import GridCell from 'components/grid/GridCell';
import StatCard from 'components/grid/StatCard';
import Excerpt from 'components/layouts/Excerpt';
import { getGameName } from 'src/util';

interface CountryOverviewData {
	firstGames: Games['game'];
	totalMedals: number;
	hostedGames?: Games['game'][];
	bestGames: Games['game'];
	bestSport: Sport['sport'];
}

interface CountryOverviewProps {
	wikipediaExcerpt: string;
	country: Country;
	overviewData: CountryOverviewData;
}

const CountryOverview: React.FC<CountryOverviewProps> = ({
	wikipediaExcerpt,
	country,
	overviewData: { firstGames, totalMedals, hostedGames, bestGames, bestSport },
}) => {
	return (
		<GridCell bg="blue" h="100%" sx={theme => ({ color: theme.colors.blue[2] })}>
			<Title order={1}>{`${country.name} (${country.country})`}</Title>
			<Box mah="50%">
				<Image
					src={`/images/countries/${country.country}.svg`}
					height="12rem"
					alt={'NOC Flag for ' + country.country}
					fit="scale-down"
					p="md"
				/>
			</Box>
			<Box m="0.5rem">
				<Excerpt text={wikipediaExcerpt} />
			</Box>
			<Box p="xs" sx={{ display: 'flex', rowGap: '1rem', flexDirection: 'column' }}>
				<StatCard
					Icon={Calendar}
					title={'First Games'}
					text={firstGames ? getGameName(firstGames) : 'N/a'}
				/>
				<StatCard Icon={Medal} title={'Total Medals'} text={`${totalMedals}`} />
				{/* <StatCard Icon={Home} title={'Games Hosted'} text={''} /> */}
				{bestGames && <StatCard Icon={Trophy} title={'Best Games'} text={getGameName(bestGames)} />}
				{bestSport && <StatCard Icon={Run} title={'Best Sport'} text={bestSport} />}
			</Box>
		</GridCell>
	);
};

export default CountryOverview;
