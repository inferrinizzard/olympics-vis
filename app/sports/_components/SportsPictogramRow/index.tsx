import type { SportProps } from "types";

import { Box, Title, Tooltip } from "@mantine/core";

import { Image } from "components/util/Image";

import { getAllGamesForSport } from "./data";

const SportsPictogramRow = async ({ sport }: SportProps) => {
	const gamesForSport = await getAllGamesForSport({ sport: sport.code });

	return (
		<Box>
			<Title order={2}>{"Icons throughout the Games"}</Title>
			<Box
				display="flex"
				mah="10rem"
				style={{ overflow: "scroll", gap: "1rem" }}
			>
				{gamesForSport.map((games) => (
					<Tooltip key={`${sport.code}~${games}`} label={`${games}`}>
						<Box h="10rem" w="10rem" pos="relative" style={{ flexShrink: 0 }}>
							<Image
								dir="sports"
								alt={`${sport.code} pictogram at ${games}`}
								code={sport.code}
								games={games}
								fill
							/>
						</Box>
					</Tooltip>
				))}
			</Box>
		</Box>
	);
};

export default SportsPictogramRow;
