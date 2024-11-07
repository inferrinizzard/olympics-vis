import type { PropsWithChildren } from "react";

import { Stack, Title } from "@mantine/core";

import * as classes from "./MainPageLayout.css";

export interface MainPageLayoutProps {
	title: string;
}

export const MainPageLayout = ({
	title,
	children,
}: PropsWithChildren<MainPageLayoutProps>) => {
	return (
		<Stack component="article" className={classes.MainPageContainer}>
			<Title order={1} className={classes.MainPageTitle}>
				{title}
			</Title>
			{children}
		</Stack>
	);
};
