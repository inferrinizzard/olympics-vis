// import { mergeThemeOverrides } from "@mantine/core";
// import { baseTheme } from "styles/theme";
// export const sportsTheme = mergeThemeOverrides(baseTheme, sportsOverride);

import { createTheme } from "@mantine/core";
import { themeToVars } from "@mantine/vanilla-extract";

export const sportsTheme = createTheme({
	primaryColor: "red",
});

export const sportsVars = themeToVars(sportsTheme);
