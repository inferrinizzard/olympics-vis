import { Box, Container, Title } from "@mantine/core";

import type { SportKey } from "types/prisma";

import GridCell from "components/grid/GridCell";

interface GamesSportsProps {
	sportsList: SportKey[];
}

const GamesSports_Client = ({ sportsList }: GamesSportsProps) => {
	return (
		<GridCell h="100%">
			<Title order={2} m="sm">
				{"Sports (WIP)"}
			</Title>
			<Container
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(3, 1fr)",
					gridTemplateRows: "repeat(3, 1fr)",
				}}
			>
				{sportsList.slice(0, 8).map((sport) => (
					<Box key={sport}>
						<h5>{sport}</h5>
					</Box>
				))}
			</Container>
		</GridCell>
	);
};

export default GamesSports_Client;
