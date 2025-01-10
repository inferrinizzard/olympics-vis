import type { Games } from "types/prisma";

import { getGameName } from "lib/utils/getGameName";

import { MainPageLayout } from "components/layouts/main-page/MainPageLayout";
import { CardList } from "components/layouts/main-page/CardList";

import { getGamesForPage } from "./_data";
import FilterButtons from "components/layouts/main-page/FilterButtons";

interface GamesPageProps {
	searchParams: Record<string, string | string[] | undefined>;
}

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

	const searchEntries = Object.entries(searchParams).map(([key, values]) =>
		values ? [key, [values].flat()] : [],
	);
	const finalGames = searchEntries.length
		? games.filter((game) =>
				searchEntries.every(
					([key, values]) =>
						game[key as keyof Games] &&
						values.includes(game[key as keyof Games] as string),
				),
			)
		: games;

	return (
		<MainPageLayout title="Games">
			<FilterButtons searchKey="season" options={["summer", "winter"]} />
			<CardList cardData={finalGames.map(gamesCardMapper)} />
		</MainPageLayout>
	);
};

export default GamesAll;
