import { style } from "@vanilla-extract/css";

import { vars } from "styles/theme";

export const SportsOverviewContainer = style({
	display: "flex",

	"@media": {
		[`screen and (max-width: ${vars.breakpoints.sm})`]: {
			flexDirection: "column",
			alignItems: "center",
		},
	},
});

export const SportsOverviewImageContainer = style({
	height: "100%",
	width: "100%",
	maxWidth: "10rem",
	maxHeight: "10rem",
	position: "relative",
	alignSelf: "center",

	"@media": {
		[`screen and (max-width: ${vars.breakpoints.sm})`]: {
			height: "10rem",
		},
	},
});
