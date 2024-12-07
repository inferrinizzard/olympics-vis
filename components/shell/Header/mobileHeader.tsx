import Link from "next/link";

import { Group, ActionIcon, Title } from "@mantine/core";
import Menu from "tabler-icons-react/dist/icons/menu-2";

import { vars } from "styles/theme";

import ColorSchemeToggle from "../../controls/ColorSchemeToggle";
import { Search } from "../../controls/Search";

import type { SharedHeaderProps } from "./types";
import * as classes from "./Header.css";

export const MobileHeader = ({
	activeHeaderLinkClassFn,
}: SharedHeaderProps) => {
	return (
		<>
			<Group>
				<Link passHref href="/" className={classes.HeaderLink}>
					<Title order={3}>{"Olympics Vis"}</Title>
				</Link>
			</Group>

			<Group>
				<ActionIcon
					size="lg"
					variant="filled"
					bg={vars.colors.primary}
					onClick={() => {}}
				>
					<Menu />
				</ActionIcon>
			</Group>

			<Group
				style={{
					borderTop: `solid 1px ${vars.colors.primary}`,
					backgroundColor: vars.colors.body,
					position: "absolute",
					top: "100%",
					insetInline: 0,
					padding: vars.spacing.xs,
				}}
			>
				<Group>
					<Search />
					<ColorSchemeToggle />
				</Group>
				<Group style={{ width: "100%", justifyContent: "space-evenly" }}>
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
			</Group>
		</>
	);
};
