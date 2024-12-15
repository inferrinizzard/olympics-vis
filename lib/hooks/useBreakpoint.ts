import { useState, useEffect } from "react";

import type { MantineBreakpoint } from "@mantine/core";
import { vars } from "styles/theme";

export const useBreakpoint = (breakpoint: MantineBreakpoint) => {
	// Local State and Refs
	const [isSmallerThan, setIsSmallerThan] = useState(
		typeof window !== "undefined" &&
			window.matchMedia(vars.smallerThan(breakpoint)).matches,
	);

	// Side Effect Hooks
	useEffect(() => {
		const mediaChangeHandler = (e: MediaQueryListEvent) => {
			if (e.matches !== isSmallerThan) {
				setIsSmallerThan(e.matches);
			}
		};

		const windowMediaQuery = window.matchMedia(vars.smallerThan(breakpoint));
		windowMediaQuery.addEventListener("change", mediaChangeHandler);

		return () =>
			windowMediaQuery.removeEventListener("change", mediaChangeHandler);
	}, [isSmallerThan, breakpoint]);

	return isSmallerThan;
};
