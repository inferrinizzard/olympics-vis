import type { PropsWithChildren } from "react";
import { MantineProvider } from "@mantine/core";

import { countriesTheme } from "./_theme";

export default function CountriesLayout({ children }: PropsWithChildren) {
	return <MantineProvider theme={countriesTheme}>{children}</MantineProvider>;
}
