import { Container, Title } from "@mantine/core";

import type { Sport } from "types/prisma";
import { getAllSports } from "lib/db";

import { CardList } from "components/layouts/CardList";

const SportsAll = async () => {
	const sports = await getAllSports();

	const sportsLists = sports.reduce(
		(lists, sport) => {
			if (
				(sport.category === "discipline" || sport.code.startsWith("P-")) &&
				sport.season === "summer"
			) {
				lists.summer.push(sport);
			} else if (
				(sport.category === "discipline" || sport.code.startsWith("P-")) &&
				sport.season === "winter"
			) {
				lists.winter.push(sport);
			} else if (sport.status === "other") {
				lists.other.push(sport);
			} else if (sport.status === "unrecognised") {
				lists.unrecognised.push(sport);
			} else if (sport.category === "sport") {
				lists.categories.push(sport);
			} else {
				lists.misc.push(sport);
			}

			return lists;
		},
		{
			summer: [] as Sport[],
			winter: [] as Sport[],
			other: [] as Sport[],
			unrecognised: [] as Sport[],
			categories: [] as Sport[],
			misc: [] as Sport[],
		},
	);

	const sportsCardMapper = (sport: Sport) => {
		return {
			imageProps: {
				dir: "sports" as const,
				code: sport.code,
				alt: `Icon for ${sport.code}`,
				parent: sport.parent,
			},
			href: `/sports/${sport.code}`,
			caption: sport.name,
		};
	};
	return (
		<Container display="flex" style={{ flexDirection: "column", gap: "2rem" }}>
			<Title order={1}>{"Sports"}</Title>
			{Object.entries(sportsLists).map(([title, list]) => (
				<CardList
					key={title}
					title={title}
					cardData={list.map(sportsCardMapper)}
				/>
			))}
		</Container>
	);
};

export default SportsAll;
