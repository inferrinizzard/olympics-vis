import { Box, Group, Title } from "@mantine/core";

import type { Country } from "@prisma/client";
import type { GamesKey, SportKey } from "types/prisma";

import Calendar from "tabler-icons-react/dist/icons/calendar";
import Medal from "tabler-icons-react/dist/icons/medal";
import Run from "tabler-icons-react/dist/icons/run";
import Trophy from "tabler-icons-react/dist/icons/trophy";

import GridCell from "components/grid/GridCell";
import StatCard from "components/grid/StatCard";
import Excerpt from "components/content/Excerpt";
import { Image } from "components/util/Image";
import { getGameName } from "lib/utils/getGameName";

import * as classes from "./CountryOverview.css";

interface CountryOverviewData {
	firstGames: GamesKey;
	totalMedals: number;
	hostedGames?: GamesKey[];
	bestGames: GamesKey;
	bestSport: SportKey;
}

interface CountryOverviewProps {
	wikipediaExcerpt: string;
	country: Country;
	overviewData: CountryOverviewData;
}

const CountryOverview_Client = ({
	wikipediaExcerpt,
	country,
	overviewData: { firstGames, totalMedals, hostedGames, bestGames, bestSport },
}: CountryOverviewProps) => {
	return (
		<GridCell className={classes.GridContainer}>
			<Title
				order={1}
				mt="xs"
				mb="xs"
				style={{ textAlign: "center" }}
			>{`${country.name} (${country.code})`}</Title>
			<Box h="10rem" w="100%" pos="relative">
				<Image
					dir="country"
					code={country.code}
					fill
					style={{ objectFit: "contain" }}
					alt={`NOC Flag for ${country.code}`}
				/>
			</Box>
			<Box m="0.5rem">
				<Excerpt text={wikipediaExcerpt} />
			</Box>
			<Group className={classes.StatCardContainer}>
				<StatCard
					Icon={Calendar}
					title={"First Games"}
					text={firstGames ? getGameName(firstGames) : "N/a"}
				/>
				<StatCard Icon={Medal} title={"Total Medals"} text={`${totalMedals}`} />
				{/* <StatCard Icon={Home} title={'Games Hosted'} text={''} /> */}
				{bestGames && (
					<StatCard
						Icon={Trophy}
						title={"Best Games"}
						text={getGameName(bestGames)}
					/>
				)}
				{bestSport && (
					<StatCard Icon={Run} title={"Best Sport"} text={bestSport} />
				)}
			</Group>
		</GridCell>
	);
};

export default CountryOverview_Client;
