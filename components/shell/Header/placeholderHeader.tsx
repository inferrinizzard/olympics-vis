import Link from "next/link";

import { Group, Title } from "@mantine/core";

import * as classes from "./Header.css";

export const PlaceholderHeader = () => {
	return (
		<Group>
			<Link passHref href="/" className={classes.HeaderLink}>
				<Title order={3}>{"Olympics Vis"}</Title>
			</Link>
		</Group>
	);
};
