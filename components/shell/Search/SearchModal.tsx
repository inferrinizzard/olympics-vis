import type { Dispatch, SetStateAction } from "react";

import { Modal } from "@mantine/core";

interface SearchModalProps {
	isSearchOpen: boolean;
	setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
}

export const SearchModal = ({
	isSearchOpen,
	setIsSearchOpen,
}: SearchModalProps) => {
	return <Modal opened={isSearchOpen} onClose={() => setIsSearchOpen(false)} />;
};
