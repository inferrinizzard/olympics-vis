import { createTheme } from "@mantine/core";
import { themeToVars } from "@mantine/vanilla-extract";

export const countriesTheme = createTheme({
	primaryColor: "blue",
});

export const countriesVars = themeToVars(countriesTheme);
