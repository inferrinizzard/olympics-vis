import type { Games } from "@prisma/client";

import { Box, Group, Stack, Title } from "@mantine/core";
import BuildingSkyscraper from "tabler-icons-react/dist/icons/building-skyscraper";
import Calendar from "tabler-icons-react/dist/icons/calendar";
import CalendarEvent from "tabler-icons-react/dist/icons/calendar-event";
import Hash from "tabler-icons-react/dist/icons/hash";
import Run from "tabler-icons-react/dist/icons/run";

import GridCell from "components/grid/GridCell";
import StatCard from "components/grid/StatCard";
import Excerpt from "components/layouts/Excerpt";
import { Image } from "components/util/Image";
import { getGameName } from "lib/utils/getGameName";

import * as classes from "./GamesOverview.css";

interface GamesOverviewProps {
	games: Games;
	wikipediaExcerpt: string;
}

const GamesOverview_Client = ({
	games,
	wikipediaExcerpt,
}: GamesOverviewProps) => {
	return (
		<GridCell className={classes.GridContainer}>
			<Group>
				<Box h="100%" pos="relative" style={{ flexGrow: 1 }}>
					<Image
						dir="games"
						code={games.code}
						alt={`Olympic emblem for ${games.code}`}
						fill
						style={{ objectFit: "contain" }}
					/>
				</Box>
				<Stack maw="75%">
					<Title order={1}>{`${getGameName(games.code)}`}</Title>
					{games.motto ? <Title order={3}>{games.motto}</Title> : null}
					<Box style={{ flexGrow: 1 }}>
						<Excerpt
							height={200}
							text={`${wikipediaExcerpt.slice(0, 1000)}... [Wikipedia]`}
						/>
					</Box>
				</Stack>
			</Group>

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
					text={games.start_date}
				/>
				<StatCard
					Icon={CalendarEvent}
					title={"End Date"}
					text={games.end_date}
				/>
				<StatCard
					Icon={Run}
					title={"Total Athletes"}
					text={games.num_athletes}
				/>
				<StatCard Icon={Hash} title={"Total Countries"} text={100} />
				<StatCard Icon={BuildingSkyscraper} title={"Host"} text={games.host} />
			</Box>
		</GridCell>
	);
};

export default GamesOverview_Client;
