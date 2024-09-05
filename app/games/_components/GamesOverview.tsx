import type { Games } from "@prisma/client";

import { Box, Title } from "@mantine/core";

import BuildingSkyscraper from "tabler-icons-react/dist/icons/building-skyscraper";
import Calendar from "tabler-icons-react/dist/icons/calendar";
import CalendarEvent from "tabler-icons-react/dist/icons/calendar-event";
import Hash from "tabler-icons-react/dist/icons/hash";
import Run from "tabler-icons-react/dist/icons/run";

import GridCell from "components/grid/GridCell";
import StatCard from "components/grid/StatCard";
import Excerpt from "components/layouts/Excerpt";
import { Image } from "components/util/Image";
import { getGameImage } from "lib/util";

interface GamesOverviewProps {
	game: Games;
	wikipediaExcerpt: string;
}

const GamesOverview: React.FC<GamesOverviewProps> = ({
	game,
	wikipediaExcerpt,
}) => {
	return (
		<GridCell
			bg="green"
			h="100%"
			style={{ display: "flex", justifyContent: "space-between" }}
		>
			<Box m="xs" w="75%" style={{ display: "flex", flexDirection: "column" }}>
				<Title order={1}>
					{`${game.year} ${game.season[0].toUpperCase() + game.season.slice(1)} Olympics`}
				</Title>
				<Title order={3}>{game.title}</Title>
				<Box style={{ flexGrow: 1 }}>
					<Excerpt
						height={200}
						text={`${wikipediaExcerpt.slice(0, 1000)}... [Wikipedia]`}
					/>
				</Box>
				<Box
					style={{
						display: "grid",
						gap: "1rem",
						gridTemplateColumns: "repeat(2, 1fr)",
					}}
				>
					<StatCard
						Icon={Calendar}
						title={"Start Date"}
						text={game.start_date}
					/>
					<StatCard
						Icon={CalendarEvent}
						title={"End Date"}
						text={game.end_date}
					/>
					<StatCard
						Icon={Run}
						title={"Total Athletes"}
						text={game.num_athletes}
					/>
					<StatCard Icon={Hash} title={"Total Countries"} text={100} />
					<StatCard Icon={BuildingSkyscraper} title={"Host"} text={game.host} />
				</Box>
			</Box>
			<Box p="sm" style={{ width: "25%" }}>
				<Image
					dir="games"
					code={game.game}
					alt={`Olympic emblem for ${game}`}
					style={{ width: "100%" }}
				/>
			</Box>
		</GridCell>
	);
};

export default GamesOverview;
