import { style } from "@vanilla-extract/css";

import { vars } from "styles/theme";

export const CardListGrid = style({
	display: "grid",
	gridTemplateColumns: "repeat(auto-fit, minmax(12rem, 1fr))",
	gap: vars.spacing.md,
	placeContent: "center",
	placeItems: "stretch",

	"@media": {
		[`screen and (max-width: ${vars.breakpoints.sm})`]: {
			display: "flex",
			gap: vars.spacing.xs,
			flexDirection: "column",
			alignContent: "stretch",
		},
	},
});
