import { Container, Title } from '@mantine/core';

import { type OlympicGameSeasonProps } from 'pages/games/[game]';
import GridCell from 'components/grid/GridCell';

interface GamesSportsProps {
	sportEvents: OlympicGameSeasonProps['sportEvents'];
}

const GamesSports: React.FC<GamesSportsProps> = ({ sportEvents }) => {
	return (
		<GridCell h="100%">
			<Title order={2} m="sm">
				{'Sports'}
			</Title>
			<Container
				sx={{
					display: 'grid',
					gridTemplateColumns: '1fr 1fr 1fr',
					gridTemplateRows: '1fr 1fr 1fr',
				}}>
				{sportEvents.slice(0, 8).map(sport => (
					<div key={sport.sport}>
						<h5>{sport.sport}</h5>
					</div>
				))}
			</Container>
		</GridCell>
	);
};

export default GamesSports;
