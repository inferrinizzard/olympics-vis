import Link from "next/link";

import { Box, ListItem, Text } from "@mantine/core";

// import { Image } from "components/util/Image";

import type { SearchResult } from "./types";

interface SearchResultItemProps extends SearchResult {
	hideCode?: boolean;
}

export const SearchResultItem = ({
	code,
	name,
	path,
	hideCode = false,
}: SearchResultItemProps) => {
	return (
		<Link href={`/${path}/${code}`}>
			<ListItem
				icon={
					// <Image
					// 	dir={(path === "countries" ? "country" : path) as "games"}
					// 	code={code}
					// 	alt={code}
					// />
					"-"
				}
			>
				<Box display="flex" style={{ gap: "0.5rem" }}>
					{hideCode ? null : (
						<>
							<Text>{code}</Text>
							<Text>{"—"}</Text>
						</>
					)}
					<Text>{name}</Text>
				</Box>
			</ListItem>
		</Link>
	);
};
