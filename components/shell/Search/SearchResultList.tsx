import { Box, List, Title } from "@mantine/core";

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
			<Title order={5}>{path}</Title>
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
