import Image from "next/image";

import { Box, Title } from "@mantine/core";

import type { ParticipationRecords } from "@prisma/client";
import type { MedalType } from "types/prisma";

import GridCell from "components/layouts/sub-page/GridCell";

import type { CountryMedalTotalsRow } from "./data";
import { getOlympicMedals, getParalympicMedals } from "./utils";

interface CountryMedalTotalsProps {
	countryMedals: CountryMedalTotalsRow[];
}

const CountryMedalTotals_Client = ({
	countryMedals,
}: CountryMedalTotalsProps) => {
	const olympicMedals = getOlympicMedals(countryMedals);
	const paralympicMedals = getParalympicMedals(countryMedals);

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
				<MedalSet title="Olympic" {...olympicMedals} />
				<MedalSet title="Paralympic" {...paralympicMedals} />
			</Box>
		</GridCell>
	);
};

interface MedalSetProps extends Pick<ParticipationRecords, MedalType> {
	title: string;
	total: number;
}

const MedalSet = ({ title, gold, silver, bronze, total }: MedalSetProps) => {
	const images = [
		`${title.toLowerCase()}Gold`,
		`${title.toLowerCase()}Silver`,
		`${title.toLowerCase()}Bronze`,
		`${title.toLowerCase()}All`,
	];

	return (
		<Box style={{ flexGrow: 1 }}>
			<Title order={4} style={{ textAlign: "center" }}>
				{title}
			</Title>
			<Box
				style={{
					display: "grid",
					gridTemplateColumns:
						"[gold] 1fr [silver] 1fr [bronze] 1fr [total] 1fr",
					gridTemplateRows: "[medals] 1fr [counts] 1fr",
				}}
			>
				{images.map((image) => (
					<Box key={`${title} ${image}`} pos="relative">
						<Image
							src={`/images/medals/${image}.svg`}
							alt={image}
							fill
							sizes="2rem"
							style={{ aspectRatio: "1 / 1", objectFit: "contain" }}
						/>
					</Box>
				))}
				{[gold, silver, bronze, total].map((medal, i) => (
					<Title
						order={5}
						key={`${title} ${images[i]}`}
						style={{ textAlign: "center" }}
					>
						{medal}
					</Title>
				))}
			</Box>
		</Box>
	);
};

export default CountryMedalTotals_Client;
