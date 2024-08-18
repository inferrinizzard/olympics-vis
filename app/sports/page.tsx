import { Container, Title } from "@mantine/core";

import type { Sport } from "@prisma/client";
import type { SportKey } from "types/prisma";
import { getAllSports, getSportWithSeason } from "lib/db";

import { CardList } from "components/layouts/CardList";

interface FutureSport extends Omit<Sport, "icon"> {
	season?: "summer" | "winter" | "historic";
}

const SportsAll = async () => {
	const sports = await getAllSports();
	const sportsMap = sports.reduce(
		(acc, cur) => {
			acc[cur.sport] = cur;
			return acc;
		},
		{} as Record<string, FutureSport>,
	);

	const sportsWithSeasons = await getSportWithSeason();

	const summerSportIds =
		sportsWithSeasons.find((x) => x.season === "summer")?.sport ?? [];
	const winterSportIds =
		sportsWithSeasons.find((x) => x.season === "winter")?.sport ?? [];

	const historicSportIds = (() => {
		const allSportKeys = new Set(sports.map(({ sport }) => sport));
		return [
			...allSportKeys
				.difference(new Set(summerSportIds))
				.difference(new Set(winterSportIds))
				.values(),
		];
	})();

	const sportsCardMapper = (sportId: SportKey) => {
		const sport = sportsMap[sportId];
		return {
			img: `/images/sports/${sportId}.svg`,
			alt: `Icon for ${sportId}`,
			href: `/sports/${sportId}`,
			caption: sport?.name,
		};
	};

	return (
		<Container display="flex" style={{ flexDirection: "column", gap: "2rem" }}>
			<Title order={1}>{"Sports"}</Title>
			<CardList
				title="Summer"
				cardData={summerSportIds.map(sportsCardMapper)}
			/>
			<CardList
				title="Winter"
				cardData={winterSportIds.map(sportsCardMapper)}
			/>
			<CardList
				title="Historic"
				cardData={historicSportIds.map(sportsCardMapper)}
			/>
		</Container>
	);
};

export default SportsAll;
