import { Container, Title } from "@mantine/core";

import type { Country } from "@prisma/client";
import { getAllCountries } from "lib/db";

import { CardList } from "components/layouts/main-page/CardList";

import TopMedalsChart from "./_components/TopMedalsChart";

const CountriesAll = async () => {
	const countries: Country[] = await getAllCountries();

	const activeNOCs: Country[] = countries.filter(
		({ status }) => status === "active",
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
		},
		href: `/countries/${country.code}`,
		caption: country.code,
		secondary: country.name,
		aspectRatio: "3 / 2",
		imageContainerStyles: {
			boxShadow:
				"1px 1px 8px 1px rgba(0, 0, 0, 0.05), -1px -1px 8px 1px rgba(0, 0, 0, 0.05)",
		},
	});

	return (
		<Container display="flex" style={{ flexDirection: "column", gap: "2rem" }}>
			<Title order={1}>{"Countries"}</Title>
			<TopMedalsChart />

			<CardList title="Active" cardData={activeNOCs.map(countryCardsMapper)} />
			<CardList
				title="Special"
				cardData={specialNOCs.map(countryCardsMapper)}
			/>
			<CardList
				title="Historic"
				cardData={historicNOCs.map(countryCardsMapper)}
			/>
		</Container>
	);
};

export default CountriesAll;
