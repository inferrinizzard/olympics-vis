"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
	Group,
	AppShellHeader as MantineHeader,
	type AppShellHeaderProps,
	ActionIcon,
	Title,
} from "@mantine/core";
import Home from "tabler-icons-react/dist/icons/home";

import ColorSchemeToggle from "components/controls/ColorSchemeToggle";
import { classNames } from "lib/utils/classNames";

import { Search } from "../Search";
import * as classes from "./Header.css";

const Header = (props: AppShellHeaderProps) => {
	const path = usePathname();

	const activeHeaderLinkClassFn = (name: string) =>
		classNames(classes.HeaderLink, {
			[classes.ActiveHeaderLink]: path.includes(name),
		});

	return (
		<MantineHeader {...props} className={classes.Header}>
			<Group>
				<Link passHref href="/" className={classes.HeaderLink}>
					<Title order={3}>{"Olympics Vis"}</Title>
				</Link>
				<Title order={3}>{" — "}</Title>
				<Link
					passHref
					href="/games"
					className={activeHeaderLinkClassFn("games")}
				>
					<Title order={3}>{"Games"}</Title>
				</Link>
				<Link
					passHref
					href="/countries"
					className={activeHeaderLinkClassFn("countries")}
				>
					<Title order={3}>{"Countries"}</Title>
				</Link>
				<Link
					passHref
					href="/sports"
					className={activeHeaderLinkClassFn("sports")}
				>
					<Title order={3}>{"Sports"}</Title>
				</Link>
			</Group>

			<Group>
				<Link passHref href="/">
					<ActionIcon size="lg">
						<Home width="1.25rem" height="1.25rem" />
					</ActionIcon>
				</Link>
				<Search />
				<ColorSchemeToggle />
			</Group>
		</MantineHeader>
	);
};

export default Header;
export * from "./Header.css";
