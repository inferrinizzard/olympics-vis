import { Container, Title } from "@mantine/core";

import type { Games } from "@prisma/client";
import { getAllGames } from "lib/db";
import { getGameImage, getGameName } from "lib/util";

import { CardList } from "components/layouts/CardList";

const GamesAll = async () => {
	const games: Games[] = await getAllGames();

	const sortedGames = games.sort((a, b) => (a.year < b.year ? 1 : -1));

	const gamesCardMapper = ({ game }: Games) => ({
		img: `/images/games/${getGameImage(game)}`,
		alt: `Olympic emblem for ${game}`,
		href: `/games/${game}`,
		caption: getGameName(game),
	});

	return (
		<Container display="flex" style={{ flexDirection: "column", gap: "2rem" }}>
			<Title order={1}>{"Games"}</Title>
			<CardList title="All" cardData={sortedGames.map(gamesCardMapper)} />
		</Container>
	);
};

export default GamesAll;
