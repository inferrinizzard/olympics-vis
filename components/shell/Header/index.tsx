"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import {
	AppShellHeader as MantineHeader,
	type AppShellHeaderProps,
	useMantineTheme,
} from "@mantine/core";

import { classNames } from "lib/utils/classNames";

import { MainHeader } from "./mainHeader";
import { MobileHeader } from "./mobileHeader";
import * as classes from "./Header.css";

const Header = (props: AppShellHeaderProps) => {
	// Util Hooks
	const path = usePathname();
	const theme = useMantineTheme();

	// Local State and Refs
	const [shouldDisplayMobile, setShouldDisplayMobile] = useState(
		window.matchMedia(`screen and (max-width: ${theme.breakpoints.sm})`)
			.matches,
	);

	// Side Effect Hooks
	useEffect(() => {
		const mediaChangeHandler = (e: MediaQueryListEvent) => {
			if (e.matches !== shouldDisplayMobile) {
				setShouldDisplayMobile(e.matches);
			}
		};

		const windowMediaQuery = window.matchMedia(
			`screen and (max-width: ${theme.breakpoints.sm})`,
		);

		windowMediaQuery.addEventListener("change", mediaChangeHandler);

		return () =>
			windowMediaQuery.removeEventListener("change", mediaChangeHandler);
	}, [theme.breakpoints.sm, shouldDisplayMobile]);

	// Event Handlers
	const activeHeaderLinkClassFn = useCallback(
		(name: string) =>
			classNames(classes.HeaderLink, {
				[classes.ActiveHeaderLink]: path.includes(name),
			}),
		[path],
	);

	// Render Functions
	const mainHeader = useMemo(
		() => <MainHeader activeHeaderLinkClassFn={activeHeaderLinkClassFn} />,
		[activeHeaderLinkClassFn],
	);

	const mobileHeader = useMemo(
		() => <MobileHeader activeHeaderLinkClassFn={activeHeaderLinkClassFn} />,
		[activeHeaderLinkClassFn],
	);

	return (
		<MantineHeader {...props} className={classes.Header}>
			{shouldDisplayMobile ? mobileHeader : mainHeader}
		</MantineHeader>
	);
};

export default Header;
export * from "./Header.css";
