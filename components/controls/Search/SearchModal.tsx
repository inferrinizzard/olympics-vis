import {
	useEffect,
	useMemo,
	useState,
	type Dispatch,
	type SetStateAction,
} from "react";

import type { PathKey } from "types/prisma";

import { Modal, TextInput } from "@mantine/core";
import FuzzySearch from "fuzzy-search";

import searchStringEntries from "./searchStrings.json";
import { SearchResultList } from "./SearchResultList";
import type { SearchResult } from "./types";

interface SearchModalProps {
	isSearchOpen: boolean;
	setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
}

export const SearchModal = ({
	isSearchOpen,
	setIsSearchOpen,
}: SearchModalProps) => {
	const [searchText, setSearchText] = useState("");

	const searcher = useMemo(
		() =>
			new FuzzySearch(searchStringEntries, ["code", "name"], { sort: true }),
		[],
	);

	const searchResults = (
		searchText.trim() ? searcher.search(searchText) : []
	) as SearchResult[];
	const groupedResults = searchResults.reduce(
		(acc, result) => {
			if (result.path in acc) {
				acc[result.path].push(result);
			} else {
				acc[result.path] = [result];
			}

			return acc;
		},
		{} as Record<PathKey, SearchResult[]>,
	);

	useEffect(() => {
		if (!isSearchOpen) {
			setSearchText("");
		}
	}, [isSearchOpen]);

	return (
		<Modal
			opened={isSearchOpen}
			onClose={() => setIsSearchOpen(false)}
			withCloseButton={false}
		>
			<TextInput onChange={(e) => setSearchText(e.target.value.trim())} />
			{Object.entries(groupedResults).map(([pathKey, results]) => (
				<SearchResultList key={`search_${pathKey}`} results={results} />
			))}
		</Modal>
	);
};
