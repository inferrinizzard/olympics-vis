import { Container, Title } from "@mantine/core";

import type { Country } from "@prisma/client";
import { getAllCountries, getMedalsLeadersFromLastTenGames } from "lib/db";

import { CardList } from "components/layouts/CardList";
import CardLink from "components/layouts/CardLink";

import { CountryImage } from "./_components/CountryImage";
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
		(gameMap, { game, country, total }) => {
			return {
				...gameMap,
				[game]: { game, ...(gameMap[game] ?? {}), [country]: total },
			};
		},
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		{} as any,
	);

	const countryCardsMapper = (country: Country) => ({
		code: country.country,
		img: `/images/countries/${country.country}.svg`,
		alt: `NOC Flag for ${country.country}`,
		href: `/countries/${country.country}`,
		caption: country.country,
		secondary: country.name,
		aspectRatio: "3 / 2",
		imgStyles: {
			boxShadow:
				"1px 1px 8px 1px rgba(0, 0, 0, 0.05), -1px -1px 8px 1px rgba(0, 0, 0, 0.05)",
		},
	});

	const renderCountryCardLink = (
		props: ReturnType<typeof countryCardsMapper>,
	) => (
		<CardLink
			key={props.code}
			{...props}
			imageElement={
				<CountryImage
					code={props.code}
					src={props.img}
					alt={props.alt}
					fill
					sizes="100vw"
				/>
			}
		/>
	);

	return (
		<Container display="flex" style={{ flexDirection: "column", gap: "2rem" }}>
			<Title order={1}>{"Countries"}</Title>
			<TopMedalsChart medalTotals={medalTotals} countryMedals={countryMedals} />

			<CardList
				title="Active"
				cardData={activeNOCs.map(countryCardsMapper)}
				renderCardLink={renderCountryCardLink}
			/>
			<CardList
				title="Special"
				cardData={specialNOCs.map(countryCardsMapper)}
				renderCardLink={renderCountryCardLink}
			/>
			<CardList
				title="Historic"
				cardData={historicNOCs.map(countryCardsMapper)}
				renderCardLink={renderCountryCardLink}
			/>
		</Container>
	);
};

export default CountriesAll;
