import { Box, Image, Title } from '@mantine/core';

import { MapPin, Calendar, Hash } from 'tabler-icons-react';

import { type OlympicSportProps } from 'pages/sports/[sport]';
import GridCell from 'components/grid/GridCell';
import StatCard from 'components/grid/StatCard';
import Excerpt from 'components/layouts/Excerpt';

interface SportsOverviewProps {
	sport: OlympicSportProps['sport'];
	wikipediaExcerpt: string;
}

const SportsOverview: React.FC<SportsOverviewProps> = ({ sport, wikipediaExcerpt }) => {
	return (
		<GridCell bg="red">
			<Box sx={{ display: 'flex' }}>
				<Box maw="15rem" miw="fit-content">
					<Title order={2}>{`${sport.name} (${sport.sport})`}</Title>
					<Image
						src={sport.icon}
						width="100%"
						alt={sport.sport + ' sport icon'}
						styles={{ root: { width: '100%', aspectRatio: '1 / 1' } }}
					/>
				</Box>
				<Box p="1rem" sx={{ flexGrow: 1 }}>
					<Excerpt text={wikipediaExcerpt} />
				</Box>
				<Box sx={{ display: 'flex', rowGap: '1rem', flexDirection: 'column' }}>
					<StatCard Icon={MapPin} title={'Best Country'} text={'Country'} />
					<StatCard Icon={Calendar} title={'First Games'} text={'games'} />
					<StatCard Icon={Hash} title={'Number of Events'} text={100} />
				</Box>
			</Box>
		</GridCell>
	);
};

export default SportsOverview;
