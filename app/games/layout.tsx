import type { PropsWithChildren } from "react";
import { MantineProvider } from "@mantine/core";

import PageNavButtons from "components/controls/PageNavButtons";

import { getGamesForPage } from "./_main/_data";
import { gamesTheme } from "./_theme";

export default async function GamesLayout({ children }: PropsWithChildren) {
	const games = await getGamesForPage(true);

	return (
		<MantineProvider theme={gamesTheme}>
			{children}
			<PageNavButtons list={games.map(({ code }) => code)} pageLabel="Games" />
		</MantineProvider>
	);
}
