import { Box, Title } from "@mantine/core";

import type { Sport } from "@prisma/client";

import Calendar from "tabler-icons-react/dist/icons/calendar";
import Hash from "tabler-icons-react/dist/icons/hash";
import MapPin from "tabler-icons-react/dist/icons/map-pin";

import GridCell from "components/grid/GridCell";
import StatCard from "components/grid/StatCard";
import Excerpt from "components/layouts/Excerpt";
import { Image } from "components/util/Image";

interface SportsOverviewProps {
	sport: Sport;
	wikipediaExcerpt: string;
}

const SportsOverview = ({ sport, wikipediaExcerpt }: SportsOverviewProps) => {
	return (
		<GridCell bg="red">
			<Box style={{ display: "flex" }}>
				<Box maw="15rem" miw="fit-content">
					<Title order={2}>{`${sport.name} (${sport.code})`}</Title>
					<Image
						dir="sports"
						code={sport.code}
						fill
						alt={`${sport.code} sport icon`}
						style={{ width: "100%", aspectRatio: "1 / 1" }}
					/>
				</Box>
				<Box p="1rem" style={{ flexGrow: 1 }}>
					<Excerpt text={wikipediaExcerpt} />
				</Box>
				<Box
					style={{ display: "flex", rowGap: "1rem", flexDirection: "column" }}
				>
					<StatCard Icon={MapPin} title={"Best Country"} text={"Country"} />
					<StatCard Icon={Calendar} title={"First Games"} text={"games"} />
					<StatCard Icon={Hash} title={"Number of Events"} text={100} />
				</Box>
			</Box>
		</GridCell>
	);
};

export default SportsOverview;
