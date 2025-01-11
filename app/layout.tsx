import type { PropsWithChildren } from "react";
import type { Metadata } from "next/types";

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
import BackButton from "components/controls/BackButton";

const workSans = Work_Sans({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-work-sans",
});

export const metadata: Metadata = {
	title: {
		template: "%s | Olympics Vis",
		default: "Olympics Vis",
	},
	description: "Web Visualiser and Database of Olympic Games & Sports",
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
						<AppShellMain style={{ marginBottom: "3rem" }}>
							{children}
							<BackButton />
						</AppShellMain>
					</AppShell>
				</MantineProvider>
			</body>
		</html>
	);
}
