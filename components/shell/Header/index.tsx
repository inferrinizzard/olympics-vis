"use client";

import { useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";

import {
	AppShellHeader as MantineHeader,
	type AppShellHeaderProps,
} from "@mantine/core";

import { ClientOnly } from "components/util/ClientOnly";
import { useBreakpoint } from "lib/hooks/useBreakpoint";
import { classNames } from "lib/utils/classNames";

import { MainHeader } from "./mainHeader";
import { MobileHeader } from "./mobileHeader";
import { PlaceholderHeader } from "./placeholderHeader";

import * as classes from "./Header.css";

const Header = (props: AppShellHeaderProps) => {
	// Util Hooks
	const path = usePathname();
	const isSmallerThanSm = useBreakpoint("sm");

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
				{isSmallerThanSm ? mobileHeader : mainHeader}
			</ClientOnly>
		</MantineHeader>
	);
};

export default Header;
export * from "./Header.css";
