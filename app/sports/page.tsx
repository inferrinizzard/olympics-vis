import { Title } from "@mantine/core";

import type { Sport } from "@prisma/client";
import { getAllSports, getSportWithSeason } from "lib/db";

interface FutureSport extends Omit<Sport, "icon"> {
	season?: "summer" | "winter" | "historic";
}

export const SportsAll = async () => {
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

	return (
		<>
			<Title order={1}>{"Sports"}</Title>
			<h2>{"summer"}</h2>
			{summerSportIds.map((sportId) => {
				const sport = sportsMap[sportId];

				return (
					<div key={sportId}>
						<span>{sportId}</span>
						{" - "}
						<span>{sport?.name}</span>
					</div>
				);
			})}
			<h2>{"winter"}</h2>
			{winterSportIds.map((sportId) => {
				const sport = sportsMap[sportId];

				return (
					<div key={sportId}>
						<span>{sportId}</span>
						{" - "}
						<span>{sport?.name}</span>
					</div>
				);
			})}
			<h2>{"historic"}</h2>
			{historicSportIds.map((sportId) => {
				const sport = sportsMap[sportId];

				return (
					<div key={sportId}>
						<span>{sportId}</span>
						{" - "}
						<span>{sport?.name}</span>
					</div>
				);
			})}
		</>
	);
};

export default SportsAll;
