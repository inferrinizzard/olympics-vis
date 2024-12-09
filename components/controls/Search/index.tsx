import { useState } from "react";

import { SearchButton } from "./SearchButton";
import { SearchModal } from "./SearchModal";

export const Search = () => {
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	return (
		<>
			<SearchButton setIsSearchOpen={setIsSearchOpen} />
			<SearchModal
				isSearchOpen={isSearchOpen}
				setIsSearchOpen={setIsSearchOpen}
			/>
		</>
	);
};
