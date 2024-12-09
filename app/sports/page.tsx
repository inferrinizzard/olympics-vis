import type { Sport } from "types/prisma";
import { getAllSports } from "lib/db";

import { MainPageLayout } from "components/layouts/main-page/MainPageLayout";
import { CardList } from "components/layouts/main-page/CardList";

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
			},
			href: `/sports/${sport.code}`,
			caption: sport.name,
		};
	};

	// TODO: disable interaction for categories

	return (
		<MainPageLayout title="Sports">
			{Object.entries(sportsLists).map(([title, list]) => (
				<CardList
					key={title}
					title={title.at(0)?.toUpperCase() + title.slice(1)}
					cardData={list.map(sportsCardMapper)}
				/>
			))}
		</MainPageLayout>
	);
};

export default SportsAll;
