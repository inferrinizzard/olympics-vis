import { style } from "@vanilla-extract/css";

export const Tooltip = style({
	background: "black",
	color: "rgb(221, 221, 221)",
	fontSize: "13px",
	borderRadius: "2px",
	boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 2px",
	padding: "5px 9px",
	display: "flex",
	flexDirection: "column",
});
