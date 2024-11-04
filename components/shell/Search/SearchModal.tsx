import {
	useEffect,
	useMemo,
	useState,
	type Dispatch,
	type SetStateAction,
} from "react";

import { Modal, TextInput } from "@mantine/core";
import FuzzySearch from "fuzzy-search";

import searchStrings from "./searchStrings.json";

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
		() => new FuzzySearch(searchStrings, ["code", "name"], { sort: true }),
		[],
	);

	const searchResults = searchText.trim() ? searcher.search(searchText) : [];

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
			{searchResults.map((str) => (
				<div key={str.code}>{str.code}</div>
			))}
		</Modal>
	);
};
