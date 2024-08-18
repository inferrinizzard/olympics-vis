import { style } from "@vanilla-extract/css";

export const CardListGrid = style({
	display: "grid",
	gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
	gap: "1rem",
});
