"use client";

import { createTheme } from "@mantine/core";
import { themeToVars } from "@mantine/vanilla-extract";

import { colours as colors } from "./colours";

export const baseTheme = createTheme({
	colors,
	primaryShade: 1,
	fontFamily: "Work Sans",
});

export const vars = themeToVars(baseTheme);
