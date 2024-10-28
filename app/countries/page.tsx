import { Container, Title } from "@mantine/core";

import type { Country } from "@prisma/client";
import { getAllCountries } from "lib/db";

import { CardList } from "components/layouts/CardList";
import CardLink from "components/layouts/CardLink";
import { Image } from "components/util/Image";

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
		code: country.code,
		img: `/images/country/${country.code}.svg`,
		alt: `Flag for ${country.code}`,
		href: `/countries/${country.code}`,
		caption: country.code,
		secondary: country.name,
		aspectRatio: "3 / 2",
		imageContainerStyles: {
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
				<Image
					dir="country"
					code={props.code}
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
			<TopMedalsChart />

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
