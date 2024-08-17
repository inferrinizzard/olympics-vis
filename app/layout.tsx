import React, { type PropsWithChildren } from "react";

import "@mantine/core/styles.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";

import { baseTheme } from "styles/theme";

export const metadata = {
	title: "Mantine Next.js template",
	description: "I am using Mantine with Next.js!",
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<head>
				<ColorSchemeScript />
				<link rel="shortcut icon" href="/favicon.svg" />
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
				/>
			</head>
			<body>
				<MantineProvider theme={baseTheme}>{children}</MantineProvider>
			</body>
		</html>
	);
}
