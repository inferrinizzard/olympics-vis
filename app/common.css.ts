import { style } from "@vanilla-extract/css";

import { vars } from "styles/theme";

export const GridCol = style({
	"@media": {
		[vars.smallerThan("sm")]: {
			width: "100%",
			maxWidth: "100%",
			flexBasis: "100%",
		},
	},
});
