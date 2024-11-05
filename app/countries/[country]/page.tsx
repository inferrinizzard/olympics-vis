import type { NextPage } from "next";
import { Container, Grid, GridCol } from "@mantine/core";

import { getAllCountries, getCountry } from "lib/db";

import CountryGamesMedalsChart from "../_components/CountryGamesMedalsChart";
import CountryMedalTotals from "../_components/CountryMedalTotals";
import CountryOverview from "../_components/CountryOverview";
import CountrySportsMedalsChart from "../_components/CountrySportsMedalsChart";

export async function generateStaticParams() {
	const countries = await getAllCountries({ select: { code: true } });

	return countries.map(({ code }) => ({ params: { country: code } }));
}

const CountryPage: NextPage<{ params: { country: string } }> = async ({
	params: { country: countryCode },
}) => {
	const country = await getCountry({ country: countryCode.toUpperCase() });

	if (!country) {
		return null;
	}

	// const countryAthletes = await getNumberOfAthletesForCountry({
	// 	country: countryCode,
	// });

	return (
		<Container fluid h="100%" p="xs">
			<Grid mt={0} h="100%" style={{ borderRadius: "1rem" }}>
				<GridCol span={4} p="xs" h="100%">
					<CountryOverview country={country} />
				</GridCol>
				<GridCol
					display="flex"
					p="xs"
					span={8}
					style={{
						flexDirection: "column",
						gap: "1rem",
					}}
				>
					<CountryMedalTotals country={country} />
					<CountrySportsMedalsChart country={country} />
					<CountryGamesMedalsChart country={country} />
				</GridCol>
			</Grid>
		</Container>
	);
};

export default CountryPage;
