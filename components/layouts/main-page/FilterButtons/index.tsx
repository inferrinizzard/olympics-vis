"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button, ButtonGroup } from "@mantine/core";
import { useCallback } from "react";

interface FilterButtonsProps {
	searchKey: string;
	options: IteratorObject<string>;
}

// can be made generic in URLSearchButtons
const FilterButtons = ({ searchKey, options }: FilterButtonsProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const currentSearch = new URLSearchParams(Array.from(searchParams.entries()));

	const isInSearch = useCallback(
		(option: string) => currentSearch.getAll(searchKey)?.includes(option),
		[searchKey, currentSearch],
	);

	const toggleOption = useCallback(
		(option: string) => {
			if (isInSearch(option)) {
				currentSearch.delete(searchKey, option);
			} else {
				currentSearch.append(searchKey, option);
			}

			router.replace(
				`${pathname}?${currentSearch.toString()}`.replace(/[?]$/, ""),
			);
		},
		[searchKey, pathname, currentSearch, router.replace, isInSearch],
	);

	return (
		<ButtonGroup>
			{options.map((option) => (
				<Button
					key={option}
					onClick={() => toggleOption(option)}
					style={{ display: "flex", gap: "1rem" }}
				>
					{option}
					{isInSearch(option) && "✔"}
				</Button>
			))}
		</ButtonGroup>
	);
};

export default FilterButtons;
