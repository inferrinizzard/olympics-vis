import { style } from "@vanilla-extract/css";

import { vars } from "styles/theme";

export const MainPageContainer = style({
	padding: vars.spacing.xs,
	gap: "2rem",
});

export const MainPageTitle = style({
	textAlign: "center",
});
