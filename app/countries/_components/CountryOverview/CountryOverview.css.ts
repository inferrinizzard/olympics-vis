import { style } from "@vanilla-extract/css";
import { vars } from "styles/theme";

export const GridContainer = style({
	height: "100%",
	display: "flex",
	flexDirection: "column",
	gap: "1rem",
	backgroundColor: vars.colors.green[1],
});

export const StatCardContainer = style({
	padding: vars.spacing.xs,
	gap: "1rem",
	flexWrap: "wrap",
});
