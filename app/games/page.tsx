import type { Games } from "types/prisma";
import type { PageProps } from "types/next";

import { getGameName } from "lib/utils/getGameName";

import { MainPageLayout } from "components/layouts/main-page/MainPageLayout";
import { CardList } from "components/layouts/main-page/CardList";
import FilterButtons from "components/layouts/main-page/FilterButtons";

import { getGamesForPage } from "./_data";
import { filterGames } from "./_filter";

interface GamesPageProps extends PageProps {}

const GamesAll = async ({ searchParams }: GamesPageProps) => {
	const games = await getGamesForPage();

	const gamesCardMapper = ({ code: games }: Games) => ({
		imageProps: {
			dir: "games" as const,
			code: games,
			alt: `Olympic emblem for ${games}`,
		},
		href: `/games/${games}`,
		caption: getGameName(games),
	});

	const { filteredGames, filters } = filterGames(games, searchParams);

	return (
		<MainPageLayout title="Games">
			{filters.map(([filterKey, filterSet]) => (
				<FilterButtons
					key={filterKey}
					searchKey={filterKey}
					options={filterSet}
				/>
			))}
			<CardList cardData={filteredGames.map(gamesCardMapper)} />
		</MainPageLayout>
	);
};

export default GamesAll;
