"use client";

import { createTheme } from "@mantine/core";
import { themeToVars } from "@mantine/vanilla-extract";

import { colours as colors } from "./colours";

export const FONT_WORK_SANS_VAR = "--font-work-sans"; // must be same as app.layout

export const baseTheme = createTheme({
	colors,
	primaryShade: 1,
	fontFamily: `var(${FONT_WORK_SANS_VAR})`,
	headings: { fontFamily: `var(${FONT_WORK_SANS_VAR})` },
});

export const vars = themeToVars(baseTheme);
