import type { Dispatch, SetStateAction } from "react";

import { ActionIcon } from "@mantine/core";
import Search from "tabler-icons-react/dist/icons/search";

interface SearchButtonProps {
	setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
}

export const SearchButton = ({ setIsSearchOpen }: SearchButtonProps) => {
	return (
		<ActionIcon size="lg" onClick={() => setIsSearchOpen((prev) => !prev)}>
			<Search width="1.25rem" height="1.25rem" />
		</ActionIcon>
	);
};
