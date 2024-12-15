import type { Country } from "types/prisma";

import { getAllCountries } from "lib/db/country";

export const getCountriesForPage = async (codeOnly = false) => {
	const countries = await getAllCountries(
		codeOnly ? { select: { code: true, status: true } } : undefined,
	);

	const activeNOCs: Country[] = countries.filter(
		({ status }) => status === "current",
	);
	const specialNOCs: Country[] = countries.filter(
		({ status }) => status === "special",
	);
	const historicNOCs: Country[] = countries.filter(
		({ status }) => status === "historic",
	);

	return { activeNOCs, specialNOCs, historicNOCs };
};
