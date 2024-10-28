import type { CountryProps } from "types";

import CountrySportsMedalsChart_Client from "./client";
import { getMedalsByCountry } from "./data";

const CountrySportsMedalsChart = async ({ country }: CountryProps) => {
	const countrySportsMedals = (
		await getMedalsByCountry({ country: country.code })
	).sort((a, b) =>
		a.gold + a.silver + a.bronze > b.gold + b.silver + b.bronze ? -1 : 1,
	);

	return (
		<CountrySportsMedalsChart_Client
			data={countrySportsMedals}
			keys={["bronze", "silver", "gold"]}
		/>
	);
};

export default CountrySportsMedalsChart;
