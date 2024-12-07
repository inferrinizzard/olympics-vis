"use client";

import { useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";

import {
	AppShellHeader as MantineHeader,
	type AppShellHeaderProps,
} from "@mantine/core";

import { classNames } from "lib/utils/classNames";

import { MainHeader } from "./mainHeader";
import * as classes from "./Header.css";

const Header = (props: AppShellHeaderProps) => {
	const path = usePathname();

	const activeHeaderLinkClassFn = useCallback(
		(name: string) =>
			classNames(classes.HeaderLink, {
				[classes.ActiveHeaderLink]: path.includes(name),
			}),
		[path.includes],
	);

	const mainHeader = useMemo(
		() => <MainHeader activeHeaderLinkClassFn={activeHeaderLinkClassFn} />,
		[activeHeaderLinkClassFn],
	);

	return (
		<MantineHeader {...props} className={classes.Header}>
			{mainHeader}
		</MantineHeader>
	);
};

export default Header;
export * from "./Header.css";
