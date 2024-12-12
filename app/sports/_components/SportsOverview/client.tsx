import { Box, Title } from "@mantine/core";

import type { CountryKey, GamesKey, Sport } from "types/prisma";

import Calendar from "tabler-icons-react/dist/icons/calendar";
import Hash from "tabler-icons-react/dist/icons/hash";
import MapPin from "tabler-icons-react/dist/icons/map-pin";

import GridCell from "components/layouts/sub-page/GridCell";
import StatCard from "components/content/StatCard";
import WikipediaExcerpt from "components/content/WikipediaExcerpt";
import { Image } from "components/util/Image";
import { getGameName } from "lib/utils/getGameName";

import * as classes from "./SportsOverview.css";

interface SportsOverviewProps {
	sport: Sport;
	bestCountry: CountryKey;
	firstGames: GamesKey;
	pageName: string;
}

const SportsOverview_Client = ({
	sport,
	bestCountry,
	firstGames,
	pageName,
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
							alt={`${sport.code} sport icon`}
							fill
							style={{ width: "100%", aspectRatio: "1 / 1" }}
						/>
					</Box>
				</Box>
				<Box p="1rem" style={{ flexGrow: 1 }}>
					<WikipediaExcerpt pageName={pageName} />
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
					<StatCard Icon={Hash} title={"Number of Events"} text={"0"} />
				</Box>
			</Box>
		</GridCell>
	);
};

export default SportsOverview_Client;
