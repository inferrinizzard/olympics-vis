import { style } from "@vanilla-extract/css";
import { vars } from "styles/theme";

export const SportsIconGrid = style({
	display: "grid",
	gridTemplateColumns: "repeat(3, 1fr)",
	gridTemplateRows: "repeat(3, 1fr)",
	justifyContent: "center",
	justifyItems: "stretch",
	gap: vars.spacing.sm,
});
