"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { ActionIcon, Tooltip } from "@mantine/core";
import ArrowBack from "tabler-icons-react/dist/icons/arrow-back";

import { vars } from "styles/theme";

const BackButton = () => {
	const path = usePathname();
	const parentPath = path.split("/").slice(0, -1).join("/").replace(/^[/]/, "");

	if (!path || path === "/") {
		return null;
	}

	return (
		<Link href={`/${parentPath}`}>
			<Tooltip label={"Return to Parent Page"}>
				<ActionIcon
					size="lg"
					pos="fixed"
					style={{
						zIndex: 1,
						cursor: "pointer",
						insetInlineEnd: vars.spacing.sm,
						bottom: vars.spacing.sm,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: vars.colors.primary,
					}}
				>
					<ArrowBack style={{ cursor: "pointer" }} />
				</ActionIcon>
			</Tooltip>
		</Link>
	);
};

export default BackButton;
