import { Box, Container, Title, Tooltip } from "@mantine/core";

import type { GamesKey, SportKey } from "types/prisma";

import GridCell from "components/grid/GridCell";
import { Image } from "components/util/Image";
import { getGameName } from "lib/util";

interface GamesSportsProps {
	gamesCode: GamesKey;
	sportsList: SportKey[];
}

const GamesSports_Client = ({ gamesCode, sportsList }: GamesSportsProps) => {
	return (
		<GridCell h="100%">
			<Title order={2} m="sm">
				{"Sports"}
			</Title>
			<Container
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(3, 1fr)",
					gridTemplateRows: "repeat(3, 1fr)",
					gap: "1rem",
				}}
			>
				{sportsList.slice(0, 8).map((sport) => (
					<Tooltip label={sport} key={sport}>
						<Box pos="relative" style={{ aspectRatio: "1 / 1" }}>
							<Image
								dir="sports"
								code={sport}
								games={gamesCode}
								alt={`Icon for ${sport} at ${getGameName(gamesCode)}`}
								fill
							/>
						</Box>
					</Tooltip>
				))}
				<Box>
					<Title order={5} m="sm">
						{"See All"}
					</Title>
				</Box>
			</Container>
		</GridCell>
	);
};

export default GamesSports_Client;
