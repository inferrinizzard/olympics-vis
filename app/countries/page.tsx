import type { Metadata } from "next";

import type { Country } from "types/prisma";

import { MainPageLayout } from "components/layouts/main-page/MainPageLayout";
import { CardList } from "components/layouts/main-page/CardList";
import SectionLinks from "components/layouts/main-page/SectionLinks";

import { getCountriesForPage } from "./_data";
import TopMedalsChart from "./_components/TopMedalsChart";

export const metadata: Metadata = { title: "Countries" };

const CountriesAll = async () => {
	const { activeNOCs, specialNOCs, historicNOCs } = await getCountriesForPage();

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

			<SectionLinks ids={["Active", "Special", "Historic"]} />

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
