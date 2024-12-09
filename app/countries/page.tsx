import type { Country } from "types/prisma";
import { getAllCountries } from "lib/db";

import { MainPageLayout } from "components/layouts/main-page/MainPageLayout";
import { CardList } from "components/layouts/main-page/CardList";

import TopMedalsChart from "./_components/TopMedalsChart";

const CountriesAll = async () => {
	const countries = await getAllCountries();

	const activeNOCs: Country[] = countries.filter(
		({ status }) => status === "current",
	);
	const specialNOCs: Country[] = countries.filter(
		({ status }) => status === "special",
	);
	const historicNOCs: Country[] = countries.filter(
		({ status }) => status === "historic",
	);

	const countryCardsMapper = (country: Country) => ({
		imageProps: {
			dir: "country" as const,
			code: country.code,
			alt: `Flag for ${country.code}`,
			style: {
				filter: "drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.1))",
			},
		},
		href: `/countries/${country.code}`,
		caption: country.code,
		secondary: country.name,
		aspectRatio: "3 / 2",
	});

	return (
		<MainPageLayout title="Countries">
			{/* <TopMedalsChart /> */}

			<CardList title="Active" cardData={activeNOCs.map(countryCardsMapper)} />
			<CardList
				title="Special"
				cardData={specialNOCs.map(countryCardsMapper)}
			/>
			<CardList
				title="Historic"
				cardData={historicNOCs.map(countryCardsMapper)}
			/>
		</MainPageLayout>
	);
};

export default CountriesAll;
