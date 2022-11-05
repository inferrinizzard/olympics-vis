import { Box, Image, Title } from '@mantine/core';

import { MapPin, Calendar, Hash } from 'tabler-icons-react';

import { type OlympicSportProps } from 'pages/sports/[sport]';
import GridCell from 'components/grid/GridCell';
import StatCard from 'components/grid/StatCard';

interface SportsOverviewProps {
	sport: OlympicSportProps['sport'];
}

const SportsOverview: React.FC<SportsOverviewProps> = ({ sport }) => {
	return (
		<GridCell colour="red" sx={theme => ({ backgroundColor: theme.colors.red[1] })}>
			<Title order={2}>{`${sport.name} (${sport.sport})`}</Title>
			<Image
				src={sport.icon}
				width={100}
				alt={sport.sport + ' sport icon'}
				// fit={'scale-down' as 'contain'}
			/>
			<Box sx={{ display: 'flex', columnGap: '1rem', flexShrink: 2, maxWidth: '100%' }}>
				<StatCard Icon={MapPin} title={'Best Country'} text={'Country'} />
				<StatCard Icon={Calendar} title={'First Games'} text={'games'} />
				<StatCard Icon={Hash} title={'Number of Events'} text={100} />
			</Box>
		</GridCell>
	);
};

export default SportsOverview;
