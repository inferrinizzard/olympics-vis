"use server";

import { Box, Group, Title } from "@mantine/core";

import type { Country, GamesKey, SportKey } from "types/prisma";

import Calendar from "tabler-icons-react/dist/icons/calendar";
import Medal from "tabler-icons-react/dist/icons/medal";
import Run from "tabler-icons-react/dist/icons/run";
import Trophy from "tabler-icons-react/dist/icons/trophy";

import GridCell from "components/layouts/sub-page/GridCell";
import StatCard from "components/content/StatCard";
import WikipediaExcerpt from "components/content/WikipediaExcerpt";
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
	country: Country;
	overviewData: CountryOverviewData;
	pageName: string;
}

const CountryOverview_Server = ({
	country,
	overviewData: { firstGames, totalMedals, hostedGames, bestGames, bestSport },
	pageName,
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
					alt={`NOC Flag for ${country.code}`}
					fill
					style={{ objectFit: "contain" }}
				/>
			</Box>
			<Box m="0.5rem">
				<WikipediaExcerpt pageName={pageName} />
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

export default CountryOverview_Server;
