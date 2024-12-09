"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { ActionIcon, Tooltip } from "@mantine/core";
import ChevronLeft from "tabler-icons-react/dist/icons/chevron-left";
import ChevronRight from "tabler-icons-react/dist/icons/chevron-right";

import { vars } from "styles/theme";

const PageNavButtons = () => {
	const path = usePathname();
	const parentPath = path.split("/").slice(0, -1).join("/").replace(/^[/]/, "");

	if (!path || path === "/") {
		return null;
	}

	return (
		<>
			<Link href={`/${parentPath}`}>
				<Tooltip label={"Prev Page"}>
					<ActionIcon
						size="lg"
						pos="fixed"
						style={{
							zIndex: 1,
							cursor: "pointer",
							insetInlineStart: vars.spacing.sm,
							bottom: vars.spacing.sm,
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: vars.colors.primary,
						}}
					>
						<ChevronLeft style={{ cursor: "pointer" }} />
					</ActionIcon>
				</Tooltip>
			</Link>
			<Link href={`/${parentPath}`}>
				<Tooltip label={"Next Page"}>
					<ActionIcon
						size="lg"
						pos="fixed"
						style={{
							zIndex: 1,
							cursor: "pointer",
							insetInlineStart: `calc(${vars.spacing.sm} + 2rem + ${vars.spacing.sm})`,
							bottom: vars.spacing.sm,
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: vars.colors.primary,
						}}
					>
						<ChevronRight style={{ cursor: "pointer" }} />
					</ActionIcon>
				</Tooltip>
			</Link>
		</>
	);
};

export default PageNavButtons;
