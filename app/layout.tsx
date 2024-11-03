import type { PropsWithChildren } from "react";

import "@mantine/core/styles.css";
import {
	MantineProvider,
	ColorSchemeScript,
	AppShell,
	AppShellMain,
} from "@mantine/core";

import { Work_Sans } from "next/font/google";

import { baseTheme } from "styles/theme";

import Header, { HEADER_HEIGHT } from "components/shell/Header";

const workSans = Work_Sans({
	subsets: ["latin"],
	display: "swap",
});

export const metadata = {
	title: "Mantine Next.js template",
	description: "I am using Mantine with Next.js!",
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en" className={workSans.className}>
			<head>
				<ColorSchemeScript />
				<link rel="shortcut icon" href="/favicon.svg" />
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
				/>
			</head>
			<body>
				<MantineProvider theme={baseTheme}>
					<AppShell header={{ height: HEADER_HEIGHT }}>
						<Header />
						<AppShellMain>{children}</AppShellMain>
					</AppShell>
				</MantineProvider>
			</body>
		</html>
	);
}
