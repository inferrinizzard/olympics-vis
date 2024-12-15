"use server";

import { Box, Container, Stack, Title } from "@mantine/core";

import type { GamesKey, SportKey } from "types/prisma";

import GridCell from "components/layouts/sub-page/GridCell";
import { Image } from "components/util/Image";
import { getGameName } from "lib/utils/getGameName";

import * as classes from "./GamesSports.css";

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
			<Container className={classes.SportsIconGrid}>
				{sportsList.slice(0, 8).map((sport) => (
					<Stack key={sport} gap="xs" align="stretch">
						<Box pos="relative" style={{ aspectRatio: "1 / 1" }}>
							<Image
								dir="sports"
								code={sport}
								games={gamesCode}
								alt={`Icon for ${sport} at ${getGameName(gamesCode)}`}
								fill
							/>
						</Box>
						<Title order={5} component="p" style={{ textAlign: "center" }}>
							{sport}
						</Title>
					</Stack>
				))}
				{sportsList.length > 8 && (
					<Stack justify="center">
						<Title order={5} component="p" style={{ textAlign: "center" }}>
							{"See All"}
						</Title>
					</Stack>
				)}
			</Container>
		</GridCell>
	);
};

export default GamesSports_Server;
