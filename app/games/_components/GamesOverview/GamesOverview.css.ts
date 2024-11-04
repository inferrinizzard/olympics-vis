import { style } from "@vanilla-extract/css";
import { vars } from "styles/theme";

export const GridContainer = style({
	height: "100%",
	backgroundColor: vars.colors.green[1],
	display: "flex",
	flexDirection: "column",
	flexWrap: "nowrap",
	gap: "1rem",
});
