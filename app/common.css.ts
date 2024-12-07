import { style } from "@vanilla-extract/css";

import { vars } from "styles/theme";

export const GridCol = style({
	"@media": {
		[`screen and (max-width: ${vars.breakpoints.sm})`]: {
			width: "100%",
			maxWidth: "100%",
			flexBasis: "100%",
		},
	},
});
