"use server";
import type { SportProps } from "types";

import { Box, Title, Tooltip } from "@mantine/core";

import GridCell from "components/layouts/sub-page/GridCell";
import { Image } from "components/util/Image";
import imageMap from "components/util/imageMap.json";
import { getGameName } from "lib/utils/getGameName";
import { buildImageMapKey } from "lib/utils/getImageSrc";

import { getAllGamesForSport } from "./data";

const SportsPictogramRow = async ({ sport }: SportProps) => {
	const gamesForSport = await getAllGamesForSport({ sport: sport.code });

	const gamesSportsWithSpecialPictogram = gamesForSport.filter((game) => {
		const mapKey = buildImageMapKey("sports", sport.code, game);

		return mapKey in imageMap;
	});

	return (
		<GridCell>
			<Title order={2} m="xs">
				{"Icons throughout the Games"}
			</Title>
			<Box
				display="flex"
				// mah="10rem"
				style={{ overflowX: "scroll", gap: "1rem" }}
			>
				{gamesSportsWithSpecialPictogram.map((games) => (
					<Tooltip
						key={`${sport.code}~${games}`}
						label={`${getGameName(games)}`}
						position="bottom"
					>
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
		</GridCell>
	);
};

export default SportsPictogramRow;
