import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import prisma from "lib/db/prisma";
import type { Games } from "@prisma/client";

import { Title } from "@mantine/core";

import CardLink from "components/layouts/CardLink";
import { getGameImage, getGameName, searchFilter } from "lib/util";

export interface GamesProps {
	games: Games[];
}

export const getStaticProps: GetStaticProps<GamesProps> = async () => {
	const games = await prisma.games.findMany();

	return { props: { games: games.sort((a, b) => (a.year < b.year ? 1 : -1)) } };
};

const Games: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
	games,
}) => {
	const router = useRouter();
	const gamesSearchFilter = searchFilter<Games>(
		["game"],
		router.query.search as string,
	);

	return (
		<>
			<Head>
				<title>{"Olympics Vis - Games"}</title>
			</Head>
			<Title order={1}>{"Games"}</Title>
			<section
				style={{
					display: "grid",
					gridTemplateColumns:
						games.length > 10
							? "repeat(auto-fit, minmax(200px, 1fr))"
							: "repeat(auto-fill, 400px)",
					gap: "1rem",
				}}
			>
				{games.filter(gamesSearchFilter).map(({ game }) => (
					<CardLink
						key={game}
						img={`/images/games/${getGameImage(game)}`}
						alt={"Olympic emblem for " + game}
						href={`/games/${game}`}
						caption={getGameName(game)}
					/>
				))}
			</section>
		</>
	);
};

export default Games;
