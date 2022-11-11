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
		<GridCell bg="red">
			<Box sx={{ display: 'flex' }}>
				<Box>
					<Title order={2}>{`${sport.name} (${sport.sport})`}</Title>
					<Image src={sport.icon} width={100} alt={sport.sport + ' sport icon'} />
				</Box>
				<Box sx={{ flexGrow: 1, padding: '1rem' }}>Lorem Ipsum</Box>
				<Box
					sx={{ display: 'flex', rowGap: '1rem', flexDirection: 'column', alignSelf: 'flex-end' }}>
					<StatCard Icon={MapPin} title={'Best Country'} text={'Country'} />
					<StatCard Icon={Calendar} title={'First Games'} text={'games'} />
					<StatCard Icon={Hash} title={'Number of Events'} text={100} />
				</Box>
			</Box>
		</GridCell>
	);
};

export default SportsOverview;
