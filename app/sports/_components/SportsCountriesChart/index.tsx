import type { SportProps } from "types";

import SportsCountriesChart_Client from "./client";
import { getCountriesWithMedals } from "./data";

const SportsCountriesChart = async ({ sport }: SportProps) => {
	const leadingCountries = await getCountriesWithMedals({ sport: sport.code });

	return <SportsCountriesChart_Client leadingCountries={leadingCountries} />;
};

export default SportsCountriesChart;
