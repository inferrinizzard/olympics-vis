"use client";

import { createTheme } from "@mantine/core";
import { themeToVars } from "@mantine/vanilla-extract";

export const baseTheme = createTheme({
	/* Put your mantine theme override here */
});

export const vars = themeToVars(baseTheme);
