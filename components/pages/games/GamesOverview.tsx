import { useState, useEffect } from 'react';

import { type Games } from '@prisma/client';

import { Title, Box, Text, Image } from '@mantine/core';

import { BuildingSkyscraper, Calendar, CalendarEvent, Run, Hash } from 'tabler-icons-react';

import GridCell from 'components/grid/GridCell';
import StatCard from 'components/grid/StatCard';
import { getWikipediaExcerpt, getWikipediaUrl } from 'src/utils/wikipedia';

interface GamesOverviewProps {
	game: Games;
}

const GamesOverview: React.FC<GamesOverviewProps> = ({ game }) => {
	const [description, setDescription] = useState('');

	useEffect(() => {
		getWikipediaExcerpt(
			getWikipediaUrl(
				'games',
				`${game.year} ${game.season.slice(0, 1).toUpperCase() + game.season.slice(1)}`
			)
		).then(setDescription);
	}, [game]);

	return (
		<GridCell bg="green" h="100%" sx={{ display: 'flex', justifyContent: 'space-between' }}>
			<Box m="xs" w="75%" sx={{ display: 'flex', flexDirection: 'column' }}>
				<Title order={1}>
					{`${game.year} ${game.season[0].toUpperCase() + game.season.slice(1)} Olympics`}
				</Title>
				<Title order={3}>{game.title}</Title>
				<Text sx={{ flexGrow: 1 }}>
					{description ? description.slice(0, 500) + '... [Wikipedia]' : ''}
				</Text>
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
