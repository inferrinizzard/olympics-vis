import type { Sport } from "types/prisma";

import { MainPageLayout } from "components/layouts/main-page/MainPageLayout";
import { CardList } from "components/layouts/main-page/CardList";
import SectionLinks from "components/layouts/main-page/SectionLinks";

import { getSportsForPage } from "./_data";

const SportsAll = async () => {
	const sportsLists = await getSportsForPage();

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
			<SectionLinks
				ids={Object.keys(sportsLists).map(
					(title) => title.at(0)?.toUpperCase() + title.slice(1),
				)}
			/>

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
