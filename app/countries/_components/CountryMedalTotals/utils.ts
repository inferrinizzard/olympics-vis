import type { CountryMedalTotalsRow } from "./data";

type MedalTotals = CountryMedalTotalsRow[];

const EMPTY = { gold: 0, silver: 0, bronze: 0, total: 0 };

export const getParalympicMedals = (medalTotals: MedalTotals) =>
	medalTotals
		.filter((row) => row.edition === "paralympics")
		.reduce(
			(acc, row) => {
				acc.gold += row.gold;
				acc.silver += row.silver;
				acc.bronze += row.bronze;
				acc.total += row.gold + row.silver + row.bronze;
				return acc;
			},
			{ ...EMPTY },
		);

export const getOlympicMedals = (medalTotals: MedalTotals) =>
	medalTotals
		.filter((row) => row.edition !== "paralympics")
		.reduce(
			(acc, row) => {
				acc.gold += row.gold;
				acc.silver += row.silver;
				acc.bronze += row.bronze;
				acc.total += row.gold + row.silver + row.bronze;
				return acc;
			},
			{ ...EMPTY },
		);

export const getSummerMedals = (medalTotals: MedalTotals) =>
	medalTotals
		.filter((row) => row.season === "summer")
		.reduce(
			(acc, row) => {
				acc.gold += row.gold;
				acc.silver += row.silver;
				acc.bronze += row.bronze;
				acc.total += row.gold + row.silver + row.bronze;
				return acc;
			},
			{ ...EMPTY },
		);

export const getWinterMedals = (medalTotals: MedalTotals) =>
	medalTotals
		.filter((row) => row.season === "winter")
		.reduce(
			(acc, row) => {
				acc.gold += row.gold;
				acc.silver += row.silver;
				acc.bronze += row.bronze;
				acc.total += row.gold + row.silver + row.bronze;
				return acc;
			},
			{ ...EMPTY },
		);
