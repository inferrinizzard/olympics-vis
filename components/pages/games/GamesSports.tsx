import { Box, Container, Title } from "@mantine/core";

import { type OlympicGameSeasonProps } from "_pages/games/[game]";
import GridCell from "components/grid/GridCell";

interface GamesSportsProps {
	sportEvents: OlympicGameSeasonProps["sportEvents"];
}

const GamesSports: React.FC<GamesSportsProps> = ({ sportEvents }) => {
	return (
		<GridCell h="100%">
			<Title order={2} m="sm">
				{"Sports (WIP)"}
			</Title>
			<Container
				sx={{
					display: "grid",
					gridTemplateColumns: "repeat(3, 1fr)",
					gridTemplateRows: "repeat(3, 1fr)",
				}}
			>
				{sportEvents.slice(0, 8).map((sport) => (
					<Box key={sport.sport}>
						<h5>{sport.sport}</h5>
					</Box>
				))}
			</Container>
		</GridCell>
	);
};

export default GamesSports;
