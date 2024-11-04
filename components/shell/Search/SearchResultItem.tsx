import { ListItem } from "@mantine/core";
import type { SearchResult } from "./types";

interface SearchResultItemProps extends SearchResult {
	hideCode?: boolean;
}

export const SearchResultItem = ({
	code,
	name,
	hideCode = false,
}: SearchResultItemProps) => {
	return (
		<ListItem>
			{hideCode ? null : code}
			{name}
		</ListItem>
	);
};
