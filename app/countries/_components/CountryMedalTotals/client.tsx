import { Box, Image, Title } from "@mantine/core";

import type { ParticipationRecords } from "@prisma/client";
import type { MedalType } from "types/prisma";

import GridCell from "components/grid/GridCell";

import type { CountryMedalTotalsWithSeason } from "./data";

interface CountryMedalTotalsProps {
	countryMedalsBySeason: CountryMedalTotalsWithSeason[];
}

const CountryMedalTotals_Client = ({
	countryMedalsBySeason,
}: CountryMedalTotalsProps) => {
	const summer = countryMedalsBySeason.find((row) => row.season === "summer")!;
	const winter = countryMedalsBySeason.find((row) => row.season === "winter")!;

	const allGoldMedals = summer.gold + winter.gold;
	const allSilverMedals = summer.silver + winter.silver;
	const allBronzeMedals = summer.bronze + winter.bronze;

	return (
		<GridCell>
			<Title order={2}>{"Medals"}</Title>
			<Box
				style={{
					display: "flex",
					columnGap: "1rem",
					justifyContent: "space-evenly",
				}}
			>
				<MedalSet title="Summer" {...summer} />
				<MedalSet title="Winter" {...winter} />
				<MedalSet
					title="Total"
					{...{
						gold: allGoldMedals,
						silver: allSilverMedals,
						bronze: allBronzeMedals,
					}}
				/>
			</Box>
		</GridCell>
	);
};

interface MedalSetProps extends Pick<ParticipationRecords, MedalType> {
	title: string;
}

const MedalSet: React.FC<MedalSetProps> = ({ title, gold, silver, bronze }) => {
	const medalUrls = [
		"https://upload.wikimedia.org/wikipedia/commons/1/15/Gold_medal.svg",
		"https://upload.wikimedia.org/wikipedia/commons/0/03/Silver_medal.svg",
		"https://upload.wikimedia.org/wikipedia/commons/5/52/Bronze_medal.svg",
	].map((url) => [url, url.replace(/^.+[/]/, "")]);

	return (
		<Box style={{ flexGrow: 1 }}>
			<Title order={4}>{title}</Title>
			<Box
				style={{
					display: "grid",
					gridTemplateColumns: "[gold] 1fr [silver] 1fr [bronze] 1fr",
					gridTemplateRows: "[medals] 1fr [counts] 1fr",
				}}
			>
				{medalUrls.map(([url, medalType]) => (
					<Image
						key={`${title} ${medalType}`}
						height="3rem"
						width="3rem"
						src={url}
						alt={medalType}
					/>
				))}
				{[gold, silver, bronze].map((medal, i) => (
					<Title order={5} key={`${title} ${medalUrls[i][1]}`}>
						{medal}
					</Title>
				))}
			</Box>
		</Box>
	);
};

export default CountryMedalTotals_Client;
