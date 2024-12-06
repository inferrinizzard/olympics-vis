import { style } from "@vanilla-extract/css";

export const CardListGrid = style({
	display: "grid",
	gridTemplateColumns: "repeat(auto-fit, minmax(12rem, 1fr))",
	gap: "1rem",
	placeContent: "center",
	placeItems: "stretch",
});
