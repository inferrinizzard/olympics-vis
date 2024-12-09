import type { PropsWithChildren } from "react";
import { MantineProvider } from "@mantine/core";

import { getAllGames } from "lib/db";
import PageNavButtons from "components/controls/PageNavButtons";

import { gamesTheme } from "./_theme";

export default async function GamesLayout({ children }: PropsWithChildren) {
	const games = await getAllGames({
		orderBy: [{ year: "desc" }, { season: "asc" }],
	});

	return (
		<MantineProvider theme={gamesTheme}>
			{children}
			<PageNavButtons list={games.map(({ code }) => code)} pageLabel="Games" />
		</MantineProvider>
	);
}
