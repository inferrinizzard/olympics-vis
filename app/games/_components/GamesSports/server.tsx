"use server";

import { Box, Container, Stack, Title, Tooltip } from "@mantine/core";

import type { GamesKey, SportKey } from "types/prisma";

import GridCell from "components/layouts/sub-page/GridCell";
import { Image } from "components/util/Image";
import { getGameName } from "lib/utils/getGameName";

interface GamesSportsProps {
	gamesCode: GamesKey;
	sportsList: SportKey[];
}

const GamesSports_Server = ({ gamesCode, sportsList }: GamesSportsProps) => {
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
					<Stack key={sport}>
						<Box pos="relative" style={{ aspectRatio: "1 / 1" }}>
							<Image
								dir="sports"
								code={sport}
								games={gamesCode}
								alt={`Icon for ${sport} at ${getGameName(gamesCode)}`}
								fill
							/>
						</Box>
						<Title component="p" order={5}>
							{sport}
						</Title>
					</Stack>
				))}
				{sportsList.length > 8 && (
					<Box>
						<Title order={5} m="sm">
							{"See All"}
						</Title>
					</Box>
				)}
			</Container>
		</GridCell>
	);
};

export default GamesSports_Server;
