import type { PropsWithChildren } from "react";
import { MantineProvider } from "@mantine/core";

import { sportsTheme } from "./_theme";

export default function SportsLayout({ children }: PropsWithChildren) {
	return <MantineProvider theme={sportsTheme}>{children}</MantineProvider>;
}
