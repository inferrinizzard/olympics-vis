import { Container, Title } from "@mantine/core";

import type { Games } from "@prisma/client";
import { getAllGames } from "lib/db";
import { getGameName } from "lib/util";

import { CardList } from "components/layouts/CardList";
import CardLink from "components/layouts/CardLink";
import { Image } from "components/util/Image";

const GamesAll = async () => {
	const games: Games[] = await getAllGames();

	const sortedGames = games.sort((a, b) => (a.year < b.year ? 1 : -1));

	const gamesCardMapper = ({ code: games }: Games) => ({
		code: games,
		img: `/images/games/${games}/emblem.jpg`,
		alt: `Olympic emblem for ${games}`,
		href: `/games/${games}`,
		caption: getGameName(games),
	});

	const renderGamesCardLink = (props: ReturnType<typeof gamesCardMapper>) => (
		<CardLink
			key={props.code}
			{...props}
			imageElement={
				<Image dir="games" code={props.code} alt={props.alt} fill />
			}
		/>
	);

	return (
		<Container display="flex" style={{ flexDirection: "column", gap: "2rem" }}>
			<Title order={1}>{"Games"}</Title>
			<CardList
				title="All"
				cardData={sortedGames.map(gamesCardMapper)}
				renderCardLink={renderGamesCardLink}
			/>
		</Container>
	);
};

export default GamesAll;
