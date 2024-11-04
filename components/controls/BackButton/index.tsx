"use client";

import { usePathname, useRouter } from "next/navigation";

import { ActionIcon, Tooltip } from "@mantine/core";
import ArrowBack from "tabler-icons-react/dist/icons/arrow-back";

import { vars } from "styles/theme";

const BackButton = () => {
	const router = useRouter();
	const path = usePathname();
	const parentPath = path.replace(/[/][^/]*$/, ""); // trim trailing /:slug

	if (!path || path === "/") {
		return null;
	}

	// TODO: use Link here if possible
	return (
		<Tooltip label={"Return to Parent Page"}>
			<ActionIcon
				size="lg"
				pos="fixed"
				style={{
					cursor: "pointer",
					right: "0.75rem",
					bottom: "0.75rem",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: vars.colors.primary,
				}}
				onClick={() => router.push(parentPath)}
			>
				<ArrowBack style={{ cursor: "pointer" }} />
			</ActionIcon>
		</Tooltip>
	);
};

export default BackButton;
