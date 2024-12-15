import type { Games } from "types/prisma";

import { getGameName } from "lib/utils/getGameName";

import { MainPageLayout } from "components/layouts/main-page/MainPageLayout";
import { CardList } from "components/layouts/main-page/CardList";

import { getGamesForPage } from "./_data";

const GamesAll = async () => {
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

	return (
		<MainPageLayout title="Games">
			<CardList title="All" cardData={games.map(gamesCardMapper)} />
		</MainPageLayout>
	);
};

export default GamesAll;
