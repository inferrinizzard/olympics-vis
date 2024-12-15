import { style } from "@vanilla-extract/css";
import { vars } from "styles/theme";

export const IconGrid = style({
	display: "grid",
	gridTemplateColumns: "repeat(3, 1fr)",
	gridTemplateRows: "repeat(3, 1fr)",
	justifyContent: "center",
	justifyItems: "stretch",
	gap: vars.spacing.sm,

	"@media": {
		[vars.smallerThan("sm")]: {
			paddingInline: 0,
		},
	},
});

export const IconGridItem = style({
	alignItems: "center",
	justifyContent: "center",
});

export const IconGridItemImageWrapper = style({
	position: "relative",
	width: ["-webkit-fill-available", "-moz-available"],
	maxWidth: "10rem",
	aspectRatio: "1 / 1",
});
