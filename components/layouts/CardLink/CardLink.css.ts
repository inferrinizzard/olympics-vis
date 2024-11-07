import { style } from "@vanilla-extract/css";

import { vars } from "styles/theme";

export const CardLinkCard = style({
	height: "100%",
	minWidth: "10rem",
	maxWidth: "12.5rem",
	aspectRatio: "3 / 4",
	boxShadow: vars.shadows.xs,
	padding: "1rem",
	borderRadius: "1rem",
	display: "flex",
	gap: "0.5rem",
	justifyContent: "space-between",
	alignItems: "center",
	cursor: "pointer",

	":hover": {
		backgroundColor: vars.colors.primary,
	},
});
