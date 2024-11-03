import { style } from "@vanilla-extract/css";

import { vars } from "styles/theme";

export const HEADER_HEIGHT = "3rem";

export const Header = style({
	height: HEADER_HEIGHT,
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	padding: vars.spacing.xs,
});

export const HeaderLink = style({
	textDecoration: "none",
});
