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
	const country = await getCountry({ country: countryCode });

	if (!country) {
		return null;
	}

	// const countryAthletes = await getNumberOfAthletesForCountry({
	// 	country: countryCode,
	// });

	return (
		<Container fluid style={{ height: "100%" }}>
			{/* <BackButton /> */}
			<Grid mt={0} h="100%" style={{ borderRadius: "1rem" }}>
				<GridCol span={4} p={"0.25rem"} h="100%">
					<CountryOverview country={country} />
				</GridCol>
				<GridCol
					span={8}
					style={{
						display: "flex",
						flexDirection: "column",
						rowGap: "1rem",
						padding: "0.25rem 0.25rem 0.25rem 0.75rem",
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
