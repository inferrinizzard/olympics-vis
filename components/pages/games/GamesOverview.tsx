import { type Games } from '@prisma/client';

import { Title, Box, Text, Image } from '@mantine/core';

import { BuildingSkyscraper, Calendar, CalendarEvent, Run, Hash } from 'tabler-icons-react';

import GridCell from 'components/grid/GridCell';
import StatCard from 'components/grid/StatCard';

interface GamesOverviewProps {
	game: Games;
}

const GamesOverview: React.FC<GamesOverviewProps> = ({ game }) => {
	return (
		<GridCell
			colour="green"
			sx={theme => ({
				height: '100%',
				display: 'flex',
				justifyContent: 'space-between',
				backgroundColor: theme.colors.green[1],
			})}>
			<Box m="xs" sx={{ width: '75%', display: 'flex', flexDirection: 'column' }}>
				<Title order={1}>{`${game.year} ${
					game.season[0].toUpperCase() + game.season.slice(1)
				} Olympics`}</Title>
				<Title order={3}>{game.title}</Title>
				<Text sx={{ flexGrow: 1 }}>Description goes here</Text>
				<Box sx={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(2, 1fr)' }}>
					<StatCard Icon={Calendar} title={'Start Date'} text={game.start_date} />
					<StatCard Icon={CalendarEvent} title={'End Date'} text={game.end_date} />
					<StatCard Icon={Run} title={'Total Athletes'} text={game.num_athletes} />
					<StatCard Icon={Hash} title={'Total Countries'} text={100} />
					<StatCard Icon={BuildingSkyscraper} title={'Host'} text={game.host} />
				</Box>
			</Box>
			<Box p="sm" sx={{ width: '25%' }}>
				<Image src={game.emblem} alt={'Olympic emblem for ' + game} sx={{ width: '100%' }} />
			</Box>
		</GridCell>
	);
};

export default GamesOverview;
