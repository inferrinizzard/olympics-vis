import type { NextPage } from "next";
import { Container, Grid, GridCol } from "@mantine/core";

import {
	getAllCountries,
	getCountry,
	getFirstGamesForCountry,
	getMedalsByCountry,
	getMedalTotalsForCountryBySeason,
	getMedalTotalsPerGamesForCountry,
} from "lib/db";
import { getWikipediaExcerpt, getWikipediaUrl } from "lib/utils/wikipedia";

import CountryGamesMedalsChart from "../_components/CountryGamesMedalsChart";
import CountryMedalTotals from "../_components/CountryMedalTotals";
import CountryOverview from "../_components/CountryOverview";
import CountrySportsMedalsChart from "../_components/CountrySportsMedalsChart";

export async function generateStaticParams() {
	const countries = await getAllCountries({ select: { code: true } });

	return countries.map((params) => ({ params }));
}

const CountryPage: NextPage<
	Awaited<ReturnType<typeof generateStaticParams>>[number]
> = async ({ params: { code: countryCode } }) => {
	const country = await getCountry({ country: countryCode });

	if (!country) {
		return null;
	}

	const countryMedalsBySeason = await getMedalTotalsForCountryBySeason({
		country: countryCode,
	});

	const countrySportsMedals = (
		await getMedalsByCountry({ country: countryCode })
	).sort((a, b) =>
		a.gold + a.silver + a.bronze > b.gold + b.silver + b.bronze ? -1 : 1,
	);

	const countryMedals = await getMedalTotalsPerGamesForCountry({
		country: countryCode,
	});

	// const countryAthletes = await getNumberOfAthletesForCountry({
	// 	country: countryCode,
	// });

	const firstGames =
		(await getFirstGamesForCountry({ country: countryCode }))?.game ?? "";

	const wikipediaExcerpt = await getWikipediaExcerpt(
		getWikipediaUrl("countries", country?.name),
	);

	const totalMedals = countryMedalsBySeason.reduce(
		(sum, { gold, silver, bronze }) => sum + gold + silver + bronze,
		0,
	);

	const bestGames = countryMedals.reduce(
		({ bestTotal, bestGame }, { game, gold, silver, bronze }) => {
			const total = gold + silver + bronze;
			return {
				bestTotal: Math.max(total, bestTotal),
				bestGame: total > bestTotal ? game : bestGame,
			};
		},
		{ bestTotal: 0, bestGame: "" },
	).bestGame;

	const bestSport = countrySportsMedals.reduce(
		({ bestTotal, bestSport }, { sport, gold, silver, bronze }) => {
			const total = gold + silver + bronze;
			return {
				bestTotal: Math.max(total, bestTotal),
				bestSport: total > bestTotal ? sport : bestSport,
			};
		},
		{ bestTotal: 0, bestSport: "" },
	).bestSport;

	return (
		<Container fluid style={{ height: "100%" }}>
			{/* <BackButton /> */}
			<Grid mt={0} h="100%" style={{ borderRadius: "1rem" }}>
				<GridCol span={4} p={"0.25rem"} h="100%">
					<CountryOverview
						country={country}
						overviewData={{ firstGames, totalMedals, bestGames, bestSport }}
						wikipediaExcerpt={wikipediaExcerpt}
					/>
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
					<CountryMedalTotals countryMedalsBySeason={countryMedalsBySeason} />
					<CountrySportsMedalsChart
						data={countrySportsMedals}
						keys={["bronze", "silver", "gold"]}
					/>
					<CountryGamesMedalsChart
						data={countryMedals}
						keys={["bronze", "silver", "gold"]}
					/>
				</GridCol>
			</Grid>
		</Container>
	);
};

export default CountryPage;
