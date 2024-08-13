import { useState } from "react";
import type { AppProps } from "next/app";

import {
	AppShell,
	ColorSchemeProvider,
	MantineProvider,
	type ColorScheme,
} from "@mantine/core";

import Header from "components/layouts/Header";

import "../styles/globals.css";
import { colours as colors } from "src/constants/colours";
import useAccentColour from "src/hooks/useAccentColour";

const OlympicsVis = ({
	Component,
	pageProps,
	...props
}: AppProps & { colorScheme: ColorScheme }) => {
	const [colorScheme, setColorScheme] = useState<ColorScheme>(
		props.colorScheme,
	);
	const { primary } = useAccentColour();

	const toggleColorScheme = (value?: ColorScheme) => {
		const nextColorScheme =
			value || (colorScheme === "dark" ? "light" : "dark");
		setColorScheme(nextColorScheme);
		// setCookies('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
	};

	return (
		<>
			<ColorSchemeProvider
				colorScheme={colorScheme}
				toggleColorScheme={toggleColorScheme}
			>
				<MantineProvider
					theme={{
						colorScheme,
						colors,
						primaryShade: 1,
						fontFamily: "Work Sans",
						headings: { fontFamily: "Montserrat" },

						globalStyles: (_theme) => ({
							".next-img-wrapper": {
								"& > span": {
									"& > img": { objectFit: "scale-down" },
								},
							},
						}),
					}}
					withGlobalStyles
					withNormalizeCSS
				>
					<AppShell
						padding="md"
						header={<Header bg={primary} />}
						styles={(theme) => ({
							body: {
								minHeight: "100vh",
							},
							main: {
								backgroundColor:
									theme.colorScheme === "dark"
										? theme.colors.dark[8]
										: theme.colors.gray[2],
								minHeight: "95vh",
							},
						})}
					>
						<Component {...pageProps} />
					</AppShell>
				</MantineProvider>
			</ColorSchemeProvider>
		</>
	);
};

export default OlympicsVis;
