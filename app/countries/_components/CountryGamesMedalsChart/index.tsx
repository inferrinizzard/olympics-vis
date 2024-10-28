import type { CountryProps } from "types";

import CountryGamesMedalsChart_Client from "./client";
import { getMedalTotalsPerGamesForCountry } from "./data";

const CountryGamesMedalsChart = async ({ country }: CountryProps) => {
	const countryMedals = await getMedalTotalsPerGamesForCountry({
		country: country.code,
	});

	return (
		<CountryGamesMedalsChart_Client
			data={countryMedals}
			keys={["bronze", "silver", "gold"]}
		/>
	);
};

export default CountryGamesMedalsChart;
