import { Box, Title } from "@mantine/core";

import type { Country, Games, Sport } from "@prisma/client";

import Calendar from "tabler-icons-react/dist/icons/calendar";
import Medal from "tabler-icons-react/dist/icons/medal";
import Run from "tabler-icons-react/dist/icons/run";
import Trophy from "tabler-icons-react/dist/icons/trophy";

import GridCell from "components/grid/GridCell";
import StatCard from "components/grid/StatCard";
import Excerpt from "components/layouts/Excerpt";
import { Image } from "components/util/Image";
import { getGameName } from "lib/util";

interface CountryOverviewData {
	firstGames: Games["game"];
	totalMedals: number;
	hostedGames?: Games["game"][];
	bestGames: Games["game"];
	bestSport: Sport["sport"];
}

interface CountryOverviewProps {
	wikipediaExcerpt: string;
	country: Country;
	overviewData: CountryOverviewData;
}

const CountryOverview: React.FC<CountryOverviewProps> = ({
	wikipediaExcerpt,
	country,
	overviewData: { firstGames, totalMedals, hostedGames, bestGames, bestSport },
}) => {
	return (
		<GridCell
			bg="blue"
			h="100%"
			// style={(theme) => ({ color: theme.colors.blue[2] })}
		>
			<Title order={1}>{`${country.name} (${country.country})`}</Title>
			<Box mah="min(50%, 12rem)" style={{ position: "relative" }}>
				<Image
					dir="country"
					code={country.country}
					fill
					style={{
						objectFit: "scale-down",
					}}
					alt={`NOC Flag for ${country.country}`}
				/>
			</Box>
			<Box m="0.5rem">
				<Excerpt text={wikipediaExcerpt} />
			</Box>
			<Box
				p="xs"
				style={{ display: "flex", rowGap: "1rem", flexDirection: "column" }}
			>
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
			</Box>
		</GridCell>
	);
};

export default CountryOverview;
