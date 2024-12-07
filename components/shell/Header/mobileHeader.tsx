import { useLayoutEffect, useState } from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { Group, ActionIcon, Title } from "@mantine/core";
import Menu from "tabler-icons-react/dist/icons/menu-2";
import Close from "tabler-icons-react/dist/icons/x";

import { vars } from "styles/theme";

import ColorSchemeToggle from "../../controls/ColorSchemeToggle";
import { Search } from "../../controls/Search";

import type { SharedHeaderProps } from "./types";
import * as classes from "./Header.css";

export const MobileHeader = ({
	activeHeaderLinkClassFn,
}: SharedHeaderProps) => {
	const path = usePathname();

	const [isOpen, setIsOpen] = useState(false);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useLayoutEffect(() => {
		setIsOpen(false);
	}, [path]);

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
					onClick={() => setIsOpen(!isOpen)}
				>
					{isOpen ? <Close /> : <Menu />}
				</ActionIcon>
			</Group>

			{isOpen && (
				<Group className={classes.MobileHeaderDropdown}>
					<Group>
						<Search />
						<ColorSchemeToggle />
					</Group>
					<Group className={classes.MobileHeaderDropdownLinkContainer}>
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
			)}
		</>
	);
};
