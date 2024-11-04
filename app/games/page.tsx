import { Container, Title } from "@mantine/core";

import type { Games } from "@prisma/client";
import { getAllGames } from "lib/db";
import { getGameName } from "lib/utils/getGameName";

import { CardList } from "components/layouts/CardList";

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
		<Container display="flex" style={{ flexDirection: "column", gap: "2rem" }}>
			<Title order={1}>{"Games"}</Title>
			<CardList title="All" cardData={sortedGames.map(gamesCardMapper)} />
		</Container>
	);
};

export default GamesAll;
