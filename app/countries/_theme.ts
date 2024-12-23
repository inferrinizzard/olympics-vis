import { createTheme } from "@mantine/core";
import { themeToVars } from "@mantine/vanilla-extract";

export const countriesTheme = createTheme({
	primaryColor: "green",
});

export const countriesVars = themeToVars(countriesTheme);
