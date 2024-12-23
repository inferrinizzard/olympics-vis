import type { PropsWithChildren } from "react";
import { MantineProvider } from "@mantine/core";

import PageNavButtons from "components/controls/PageNavButtons";

import { getCountriesForPage } from "./_data";
import { countriesTheme } from "./_theme";

export default async function CountriesLayout({ children }: PropsWithChildren) {
	const { activeNOCs, specialNOCs, historicNOCs } =
		await getCountriesForPage(true);
	const countries = [...activeNOCs, ...specialNOCs, ...historicNOCs];

	return (
		<MantineProvider theme={countriesTheme}>
			{children}
			<PageNavButtons
				list={countries.map(({ code }) => code)}
				pageLabel="Country"
			/>
		</MantineProvider>
	);
}
