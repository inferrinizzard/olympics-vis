import React, { type PropsWithChildren } from "react";

import "@mantine/core/styles.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";

import { baseTheme } from "styles/theme";

import { Work_Sans } from "next/font/google";

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
					{/* <AppShell
						padding="md"
						header={<Header bg={primary} />}
						// styles={(theme) => ({
						// 	body: {
						// 		minHeight: "100vh",
						// 	},
						// 	main: {
						// 		backgroundColor:
						// 			theme.colorScheme === "dark"
						// 				? theme.colors.dark[8]
						// 				: theme.colors.gray[2],
						// 		minHeight: "95vh",
						// 	},
						// })}
					>
					{children}
					</AppShell> */}
					{children}
				</MantineProvider>
			</body>
		</html>
	);
}
