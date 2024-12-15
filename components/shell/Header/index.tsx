"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import {
	AppShellHeader as MantineHeader,
	type AppShellHeaderProps,
} from "@mantine/core";
import { vars } from "styles/theme";

import { ClientOnly } from "components/util/ClientOnly";
import { classNames } from "lib/utils/classNames";

import { MainHeader } from "./mainHeader";
import { MobileHeader } from "./mobileHeader";
import * as classes from "./Header.css";
import { PlaceholderHeader } from "./placeholderHeader";

const Header = (props: AppShellHeaderProps) => {
	// Util Hooks
	const path = usePathname();

	// Local State and Refs
	const [shouldDisplayMobile, setShouldDisplayMobile] = useState(
		typeof window !== "undefined" &&
			window.matchMedia(vars.smallerThan("sm")).matches,
	);

	// Side Effect Hooks
	useEffect(() => {
		const mediaChangeHandler = (e: MediaQueryListEvent) => {
			if (e.matches !== shouldDisplayMobile) {
				setShouldDisplayMobile(e.matches);
			}
		};

		const windowMediaQuery = window.matchMedia(vars.smallerThan("sm"));
		windowMediaQuery.addEventListener("change", mediaChangeHandler);

		return () =>
			windowMediaQuery.removeEventListener("change", mediaChangeHandler);
	}, [shouldDisplayMobile]);

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
			<ClientOnly placeholder={<PlaceholderHeader />}>
				{shouldDisplayMobile ? mobileHeader : mainHeader}
			</ClientOnly>
		</MantineHeader>
	);
};

export default Header;
export * from "./Header.css";
