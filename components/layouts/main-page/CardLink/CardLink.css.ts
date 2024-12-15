import { style } from "@vanilla-extract/css";

import { vars } from "styles/theme";

export const CardLinkCard = style({
	height: "100%",
	width: "-webkit-fill-available",
	minWidth: "10rem",
	maxWidth: "13.5rem",
	// aspectRatio: "3 / 4",
	boxShadow: vars.shadows.xs,
	padding: "1rem",
	borderRadius: "1rem",
	display: "flex",
	gap: "1rem",
	alignItems: "center",
	cursor: "pointer",

	":hover": {
		backgroundColor: vars.colors.primary,
	},

	"@media": {
		[vars.smallerThan("sm")]: {
			display: "flex",
			flexDirection: "row",
			maxWidth: "unset",
			width: "100%",
		},
	},
});

export const CardLinkLink = style({
	display: "flex",
	alignItems: "center",
	flexGrow: 1,
	flexBasis: "10rem",
	textDecoration: "none",

	"@media": {
		[vars.smallerThan("sm")]: {
			flexBasis: "6rem",
		},
	},
});

export const CardLinkImageWrapper = style({
	position: "relative",
	width: "100%",
	marginTop: 0,

	"@media": {
		[vars.smallerThan("sm")]: {
			margin: 0,
			width: "6rem",
		},
	},
});
