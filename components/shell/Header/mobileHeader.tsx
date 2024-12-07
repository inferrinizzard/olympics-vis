import Link from "next/link";

import { Group, ActionIcon, Title, Button } from "@mantine/core";
import Home from "tabler-icons-react/dist/icons/home";

import ColorSchemeToggle from "components/controls/ColorSchemeToggle";

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
				'mobile'
				{/* <Button /> */}
				{/* <Search />
				<ColorSchemeToggle /> */}
			</Group>

			<Group style={{ position: "absolute" }}>{/*  */}</Group>
		</>
	);
};
