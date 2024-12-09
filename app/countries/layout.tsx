import type { PropsWithChildren } from "react";
import { MantineProvider } from "@mantine/core";

import { getAllCountries } from "lib/db";
import PageNavButtons from "components/controls/PageNavButtons";

import { countriesTheme } from "./_theme";

export default async function CountriesLayout({ children }: PropsWithChildren) {
	const countries = await getAllCountries({
		orderBy: [{ status: "asc" }, { code: "asc" }],
	});

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
