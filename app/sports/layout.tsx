import type { PropsWithChildren } from "react";
import { MantineProvider } from "@mantine/core";

import { getAllSports } from "lib/db";
import PageNavButtons from "components/controls/PageNavButtons";

import { sportsTheme } from "./_theme";

export default async function SportsLayout({ children }: PropsWithChildren) {
	const sports = await getAllSports({
		orderBy: [{ season: "asc" }, { status: "asc" }, { code: "asc" }],
		where: { category: "discipline" },
	});

	return (
		<MantineProvider theme={sportsTheme}>
			{children}
			<PageNavButtons list={sports.map(({ code }) => code)} pageLabel="Sport" />
		</MantineProvider>
	);
}
