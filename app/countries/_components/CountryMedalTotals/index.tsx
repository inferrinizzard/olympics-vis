import type { CountryProps } from "types";

import CountryMedalTotals_Client from "./client";
import { getMedalTotalsForCountry } from "./data";

const CountryMedalTotals = async ({ country }: CountryProps) => {
	const countryMedals = await getMedalTotalsForCountry({
		country: country.code,
	});

	return <CountryMedalTotals_Client countryMedals={countryMedals} />;
};

export default CountryMedalTotals;
