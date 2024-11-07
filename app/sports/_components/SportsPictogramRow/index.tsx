import type { SportProps } from "types";

import { Box, Title, Tooltip } from "@mantine/core";

import GridCell from "components/grid/GridCell";
import { getSportsImageSrc, Image } from "components/util/Image";
import { getGameName } from "lib/utils/getGameName";

import { getAllGamesForSport } from "./data";

const SportsPictogramRow = async ({ sport }: SportProps) => {
	const gamesForSport = await getAllGamesForSport({ sport: sport.code });

	const basePictogramUrl = await getSportsImageSrc(sport.code);
	const gamesSportsWithSpecialPictogram = await Promise.all(
		gamesForSport.flatMap(async (games) => {
			const src = await getSportsImageSrc(sport.code, undefined, games);
			return src && src !== basePictogramUrl ? games : undefined;
		}),
	).then((list) => list.flatMap((x) => x || []));

	return (
		<GridCell>
			<Title order={2} m="xs">
				{"Icons throughout the Games"}
			</Title>
			<Box
				display="flex"
				mah="10rem"
				style={{ overflow: "scroll", gap: "1rem" }}
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
