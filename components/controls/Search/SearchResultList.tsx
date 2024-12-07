import Link from "next/link";

import { Box, List, Text, Title } from "@mantine/core";

import { SearchResultItem } from "./SearchResultItem";
import type { SearchResult } from "./types";

interface SearchResultListProps {
	results: SearchResult[];
}

export const SearchResultList = ({ results }: SearchResultListProps) => {
	if (!results.length) {
		return null;
	}

	const path = results[0].path;
	return (
		<Box>
			<Box display="flex" style={{ justifyContent: "space-between" }}>
				<Title order={5}>{path}</Title>
				<Link href={`/${path}`}>
					<Text>{"See all"}</Text>
				</Link>
			</Box>
			<List>
				{results.map((result, i) => (
					<SearchResultItem
						key={`${result.code}_${i}`}
						{...result}
						hideCode={path === "games"}
					/>
				))}
			</List>
		</Box>
	);
};
