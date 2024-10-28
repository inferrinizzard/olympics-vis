import type { CountryProps } from "types";

import CountryMedalTotals_Client from "./client";
import { getMedalTotalsForCountryBySeason } from "./data";

const CountryMedalTotals = async ({ country }: CountryProps) => {
	const countryMedalsBySeason = await getMedalTotalsForCountryBySeason({
		country: country.code,
	});

	return (
		<CountryMedalTotals_Client countryMedalsBySeason={countryMedalsBySeason} />
	);
};

export default CountryMedalTotals;
