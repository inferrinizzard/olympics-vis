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

export const ActiveHeaderLink = style({
	borderRadius: vars.radius.sm,
	color: vars.colors.white,
	backgroundColor: vars.colors.primary,
	padding: "0.25rem",
});

export const MobileHeaderDropdown = style({
	borderTop: `solid 1px ${vars.colors.primary}`,
	backgroundColor: vars.colors.body,
	position: "absolute",
	top: "100%",
	insetInline: 0,
	padding: vars.spacing.xs,
});

export const MobileHeaderDropdownLinkContainer = style({
	width: "100%",
	justifyContent: "space-evenly",
});
