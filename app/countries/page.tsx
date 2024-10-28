import { Container, Title } from "@mantine/core";

import type { Country } from "@prisma/client";
import { getAllCountries, getMedalsLeadersFromLastTenGames } from "lib/db";

import { CardList } from "components/layouts/CardList";

import { TopMedalsChart } from "./_components/TopMedalsChart";

const CountriesAll = async () => {
	const countries: Country[] = await getAllCountries();

	const medalTotals = await getMedalsLeadersFromLastTenGames();

	const activeNOCs: Country[] = countries.filter(
		({ status }) => status === "active",
	);
	const specialNOCs: Country[] = countries.filter(
		({ status }) => status === "special",
	);
	const historicNOCs: Country[] = countries.filter(
		({ status }) => status === "historic",
	);

	const countryMedals = medalTotals.reduce(
		(gameMap, { games, country, total }) => {
			return {
				...gameMap,
				[games]: { games, ...(gameMap[games] ?? {}), [country]: total },
			};
		},
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		{} as any,
	);

	const countryCardsMapper = (country: Country) => ({
		img: `/images/countries/${country.code}.svg`,
		alt: `NOC Flag for ${country.code}`,
		href: `/countries/${country.code}`,
		caption: country.code,
		secondary: country.name,
		aspectRatio: "3 / 2",
		imgStyles: {
			boxShadow:
				"1px 1px 8px 1px rgba(0, 0, 0, 0.05), -1px -1px 8px 1px rgba(0, 0, 0, 0.05)",
		},
	});

	return (
		<Container display="flex" style={{ flexDirection: "column", gap: "2rem" }}>
			<Title order={1}>{"Countries"}</Title>
			<TopMedalsChart medalTotals={medalTotals} countryMedals={countryMedals} />

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
