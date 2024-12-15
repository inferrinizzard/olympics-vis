import type { PropsWithChildren } from "react";
import { MantineProvider } from "@mantine/core";

import PageNavButtons from "components/controls/PageNavButtons";

import { getSportsForPage } from "./_data";
import { sportsTheme } from "./_theme";

export default async function SportsLayout({ children }: PropsWithChildren) {
	const sportsLists = await getSportsForPage(true);
	const sports = Object.values(sportsLists).reduce((acc, cur) =>
		acc.concat(cur),
	);

	return (
		<MantineProvider theme={sportsTheme}>
			{children}
			<PageNavButtons list={sports.map(({ code }) => code)} pageLabel="Sport" />
		</MantineProvider>
	);
}
