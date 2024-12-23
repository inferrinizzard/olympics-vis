import { style } from "@vanilla-extract/css";
import { vars } from "styles/theme";

export const FeaturedCardsContainer = style({
	flexDirection: "row",
	gap: vars.spacing.sm,
	justifyContent: "space-evenly",
	marginTop: vars.spacing.xl,

	"@media": {
		[vars.smallerThan("sm")]: {
			flexDirection: "column",
			gap: vars.spacing.xl,
		},
	},
});
