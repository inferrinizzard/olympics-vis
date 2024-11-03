"use client";

import Link from "next/link";

import {
	Group,
	AppShellHeader as MantineHeader,
	type AppShellHeaderProps,
	ActionIcon,
	Title,
} from "@mantine/core";

import Home from "tabler-icons-react/dist/icons/home";
import Search from "tabler-icons-react/dist/icons/search";

import ColorSchemeToggle from "components/controls/ColorSchemeToggle";

import * as classes from "./Header.css";

const Header = (props: AppShellHeaderProps) => {
	return (
		<MantineHeader {...props} className={classes.Header}>
			<Group>
				<Link passHref href="/">
					<ActionIcon size="lg">
						<Home width="1.25rem" height="1.25rem" />
					</ActionIcon>
				</Link>
				<Link passHref href="/games" className={classes.HeaderLink}>
					<Title>{"Games"}</Title>
				</Link>
				<Link passHref href="/countries" className={classes.HeaderLink}>
					<Title>{"Countries"}</Title>
				</Link>
				<Link passHref href="/sports" className={classes.HeaderLink}>
					<Title>{"Sports"}</Title>
				</Link>
			</Group>

			<Group>
				<ActionIcon size="lg">
					<Search width="1.25rem" height="1.25rem" />
				</ActionIcon>
				<ColorSchemeToggle />
			</Group>
		</MantineHeader>
	);
};

export default Header;
export * from "./Header.css";
