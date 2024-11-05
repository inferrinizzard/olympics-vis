import type { CountryProps } from "types";

import { getGameName } from "lib/utils/getGameName";

import CountryGamesMedalsChart_Client from "./client";
import { getMedalTotalsPerGamesForCountry } from "./data";

const CountryGamesMedalsChart = async ({ country }: CountryProps) => {
	const countryMedals = await getMedalTotalsPerGamesForCountry({
		country: country.code,
	}).then((rows) =>
		rows.map((row) => ({ ...row, games: getGameName(row.games) })),
	);

	return (
		<CountryGamesMedalsChart_Client
			data={countryMedals}
			keys={["bronze", "silver", "gold"]}
		/>
	);
};

export default CountryGamesMedalsChart;
