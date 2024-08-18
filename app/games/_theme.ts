import { createTheme } from "@mantine/core";
import { themeToVars } from "@mantine/vanilla-extract";

export const gamesTheme = createTheme({
	primaryColor: "blue",
});

export const gamesVars = themeToVars(gamesTheme);
