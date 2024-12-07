import { Box, Title } from "@mantine/core";

import type { CountryKey, GamesKey, Sport } from "types/prisma";

import Calendar from "tabler-icons-react/dist/icons/calendar";
import Hash from "tabler-icons-react/dist/icons/hash";
import MapPin from "tabler-icons-react/dist/icons/map-pin";

import GridCell from "components/layouts/sub-page/GridCell";
import StatCard from "components/content/StatCard";
import Excerpt from "components/content/Excerpt";
import { Image } from "components/util/Image";
import { getGameName } from "lib/utils/getGameName";

import * as classes from "./SportsOverview.css";

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
			<Box className={classes.SportsOverviewContainer}>
				<Box
					maw="15rem"
					miw="fit-content"
					display="flex"
					style={{ flexDirection: "column", gap: "1rem" }}
				>
					<Title order={2}>{`${sport.name} (${sport.code})`}</Title>
					<Box className={classes.SportsOverviewImageContainer}>
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
