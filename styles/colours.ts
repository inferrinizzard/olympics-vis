import type * as core from "@mantine/core";

const c1 = {
	blue: ["#016EB7", "#0175C0", "#0186DF"],
	red: ["#DB1A1A", "#E52323", "#E73636"],
	yellow: ["#F4AB01", "#FAB001", "#FEBB20"],
	green: ["#008F3C", "#00973F", "#00B84D"],
	black: ["#000000"],
	bronze: ["#AE9456"],
};

const colourKeys = ["blue", "red", "yellow", "green", "black"] as const;

interface ColourSet {
	light: string;
	primary: string;
	dark: string;
}

const adobe: Record<(typeof colourKeys)[number], ColourSet> = Object.freeze({
	blue: {
		light: "#3D8EC3",
		primary: "#016EB7",
		dark: "#012238",
	},
	yellow: {
		light: "#fff",
		primary: "#ffd801",
		dark: "#403600",
	},
	green: {
		light: "#fff",
		primary: "#00993f",
		dark: "#005925",
	},
	red: {
		light: "#fff",
		primary: "#ca2e2f",
		dark: "#4A1111",
	},
	black: {
		light: "#fff",
		primary: "#353535",
		dark: "#000000",
	},
} as const);

export const colours = Object.entries(adobe).reduce(
	(acc, [key, colours]) => ({
		...acc,
		[key]: [...Object.values(colours), ...new Array(10).fill("#fff")].slice(
			0,
			10,
		),
	}),
	{} as Record<(typeof colourKeys)[number], core.MantineColorsTuple>,
);

export const accentColourMapping: Record<string, string> = {
	countries: "blue",
	sports: "red",
	games: "green",
};
