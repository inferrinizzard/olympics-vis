import type { PropsWithChildren } from "react";
import { MantineProvider } from "@mantine/core";

import { gamesTheme } from "./_theme";

export default function GamesLayout({ children }: PropsWithChildren) {
	return <MantineProvider theme={gamesTheme}>{children}</MantineProvider>;
}
