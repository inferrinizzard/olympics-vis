import { Box, Title } from "@mantine/core";

import type { CountryKey, GamesKey, Sport } from "types/prisma";

import Calendar from "tabler-icons-react/dist/icons/calendar";
import Hash from "tabler-icons-react/dist/icons/hash";
import MapPin from "tabler-icons-react/dist/icons/map-pin";

import GridCell from "components/grid/GridCell";
import StatCard from "components/grid/StatCard";
import Excerpt from "components/layouts/Excerpt";
import { Image } from "components/util/Image";
import { getGameName } from "lib/util";

interface SportsOverviewProps {
	sport: Sport;
	wikipediaExcerpt: string;
	bestCountry: CountryKey;
	firstGames: GamesKey;
}

const SportsOverview_Client = ({
	sport,
	wikipediaExcerpt,
	bestCountry,
	firstGames,
}: SportsOverviewProps) => {
	return (
		<GridCell bg="red">
			<Box style={{ display: "flex" }}>
				<Box
					maw="15rem"
					miw="fit-content"
					display="flex"
					flex="column"
					style={{ gap: "1rem" }}
				>
					<Title order={2}>{`${sport.name} (${sport.code})`}</Title>
					<Box
						maw="10rem"
						mah="10rem"
						pos="relative"
						style={{ alignSelf: "center" }}
					>
						<Image
							dir="sports"
							code={sport.code}
							fill
							alt={`${sport.code} sport icon`}
							style={{ width: "100%", aspectRatio: "1 / 1" }}
						/>
					</Box>
				</Box>
				<Box p="1rem" style={{ flexGrow: 1 }}>
					<Excerpt text={wikipediaExcerpt} />
				</Box>
				<Box
					style={{ display: "flex", rowGap: "1rem", flexDirection: "column" }}
				>
					<StatCard Icon={MapPin} title={"Best Country"} text={bestCountry} />
					<StatCard
						Icon={Calendar}
						title={"First Games"}
						text={getGameName(firstGames)}
					/>
					<StatCard Icon={Hash} title={"Number of Events"} text={100} />
				</Box>
			</Box>
		</GridCell>
	);
};

export default SportsOverview_Client;
