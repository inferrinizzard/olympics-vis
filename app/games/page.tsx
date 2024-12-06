import type { Games } from "@prisma/client";
import { getAllGames } from "lib/db";
import { getGameName } from "lib/utils/getGameName";

import { MainPageLayout } from "components/layouts/main-page/MainPageLayout";
import { CardList } from "components/layouts/main-page/CardList";

const GamesAll = async () => {
	const games: Games[] = await getAllGames();

	const sortedGames = games.sort((a, b) => (a.year < b.year ? 1 : -1));

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
			<CardList title="All" cardData={sortedGames.map(gamesCardMapper)} />
		</MainPageLayout>
	);
};

export default GamesAll;
