import { type Games } from '@prisma/client';

import { Box, Image, Title } from '@mantine/core';

import { BuildingSkyscraper, Calendar, CalendarEvent, Run, Hash } from 'tabler-icons-react';

import GridCell from 'components/grid/GridCell';
import StatCard from 'components/grid/StatCard';
import Excerpt from 'components/layouts/Excerpt';

interface GamesOverviewProps {
	game: Games;
	wikipediaExcerpt: string;
}

const GamesOverview: React.FC<GamesOverviewProps> = ({ game, wikipediaExcerpt }) => {
	return (
		<GridCell bg="green" h="100%" sx={{ display: 'flex', justifyContent: 'space-between' }}>
			<Box m="xs" w="75%" sx={{ display: 'flex', flexDirection: 'column' }}>
				<Title order={1}>
					{`${game.year} ${game.season[0].toUpperCase() + game.season.slice(1)} Olympics`}
				</Title>
				<Title order={3}>{game.title}</Title>
				<Box sx={{ flexGrow: 1 }}>
					<Excerpt height={200} text={wikipediaExcerpt.slice(0, 1000) + '... [Wikipedia]'} />
				</Box>
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
