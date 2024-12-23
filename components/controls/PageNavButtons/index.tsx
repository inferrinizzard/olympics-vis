"use client";

import { useMemo } from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { ActionIcon, Group, Tooltip } from "@mantine/core";
import ChevronLeft from "tabler-icons-react/dist/icons/chevron-left";
import ChevronRight from "tabler-icons-react/dist/icons/chevron-right";

import { vars } from "styles/theme";

export interface PageNavButtonsProps {
	list: string[];
	pageLabel: string;
}

const PageNavButtons = ({ list, pageLabel }: PageNavButtonsProps) => {
	const path = usePathname();
	const pageSlug = path.split("/").at(-1);

	const index = useMemo(() => {
		return list.findIndex((code) => code === pageSlug);
	}, [list, pageSlug]);

	const prevPath = useMemo(
		() => pageSlug && path.replace(pageSlug, list[index - 1]),
		[pageSlug, path, list, index],
	);
	const nextPath = useMemo(
		() => pageSlug && path.replace(pageSlug, list[index + 1]),
		[pageSlug, path, list, index],
	);

	if (index < 0) {
		return null;
	}

	return (
		<Group
			pos="fixed"
			gap={vars.spacing.sm}
			style={{
				zIndex: 1,
				insetInlineStart: vars.spacing.sm,
				bottom: vars.spacing.sm,
			}}
		>
			{list[index - 1] && prevPath && (
				<Link href={prevPath}>
					<Tooltip label={`Prev ${pageLabel}`}>
						<ActionIcon
							size="lg"
							style={{
								cursor: "pointer",
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
			)}
			{list[index + 1] && nextPath && (
				<Link href={nextPath}>
					<Tooltip label={`Next ${pageLabel}`}>
						<ActionIcon
							size="lg"
							style={{
								cursor: "pointer",
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
			)}
		</Group>
	);
};

export default PageNavButtons;
