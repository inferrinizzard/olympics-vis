import type {
	NextPage,
	GetStaticProps,
	InferGetStaticPropsType,
	GetStaticPaths,
} from "next";
import Head from "next/head";

import { Container, Grid } from "@mantine/core";

import type {
	Country,
	CountryAthletes,
	CountryMedals,
	CountrySportsMedals,
	Games,
	MedalTotals,
} from "@prisma/client";
import {
	getCountry,
	getCountryKeys,
	getFirstGamesForCountry,
	getMedalsByCountry,
	getMedalTotalsForCountry,
	getMedalTotalsPerGamesForCountry,
	getNumberOfAthletesForCountry,
} from "lib/db";

import CountryOverview from "components/pages/countries/CountryOverview";
import CountryMedalTotals from "components/pages/countries/CountryMedalTotals";
import CountryGamesMedalsChart from "components/pages/countries/CountryGamesMedalsChart";
import CountrySportsMedalsChart from "components/pages/countries/CountrySportsMedalsChart";
import BackButton from "components/layouts/BackButton";
import { getWikipediaExcerpt, getWikipediaUrl } from "lib/utils/wikipedia";

export interface OlympicNOCProps {
	country: Country;
	medalTotals: { summer: MedalTotals; winter: MedalTotals };
	countrySportsMedals: CountrySportsMedals[];
	countryMedals: CountryMedals[];
	countryAthletes: Pick<CountryAthletes, "game"> & Record<"athletes", number>;
	firstGames: Games["game"];
	wikipediaExcerpt: string;
}

export const getStaticProps: GetStaticProps<OlympicNOCProps> = async ({
	params,
}) => {
	const countryId = params?.country as string;

	const country = await getCountry({ country: countryId });

	const medalsRows = await getMedalTotalsForCountry({ country: countryId });

	const zeroMedals = {
		gold: 0,
		silver: 0,
		bronze: 0,
		total: 0,
		country: countryId,
	} as Omit<MedalTotals, "season">;
	const medalTotals = medalsRows.reduce(
		(acc, cur) => ({ ...acc, [cur.season]: cur }),
		{
			summer: { ...zeroMedals, season: "summer" },
			winter: { ...zeroMedals, season: "winter" },
		},
	);

	const countrySportsMedals = (
		await getMedalsByCountry({ country: countryId })
	).sort((a, b) =>
		a.gold + a.silver + a.bronze > b.gold + b.silver + b.bronze ? -1 : 1,
	);

	const countryMedals = (
		await getMedalTotalsPerGamesForCountry({ country: countryId })
	).reverse();

	const countryAthletes = await getNumberOfAthletesForCountry({
		country: countryId,
	});

	const firstGames =
		(await getFirstGamesForCountry({ country: countryId }))?.games?.[0] ??
		("" as Games["game"]);

	const wikipediaExcerpt = await getWikipediaExcerpt(
		getWikipediaUrl("countries", country?.name),
	);

	return {
		props: {
			country,
			medalTotals,
			countrySportsMedals,
			countryMedals,
			countryAthletes,
			firstGames,
			wikipediaExcerpt,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const countries = await getCountryKeys();

	return {
		paths: countries.map(({ country }) => ({ params: { country } })),
		fallback: false,
	};
};

const OlympicNOC: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
	country,
	medalTotals,
	countrySportsMedals,
	countryMedals,
	countryAthletes,
	firstGames,
	wikipediaExcerpt,
}) => {
	const totalMedals = Object.values(medalTotals).reduce(
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
		<>
			<Head>
				<title>{`Olympics Vis - ${country.name}`}</title>
			</Head>
			<Container fluid sx={{ height: "100%" }}>
				<BackButton />
				<Grid mt={0} h="100%" sx={{ borderRadius: "1rem" }}>
					<Grid.Col span={4} p={"0.25rem"} h="100%">
						<CountryOverview
							country={country}
							overviewData={{ firstGames, totalMedals, bestGames, bestSport }}
							wikipediaExcerpt={wikipediaExcerpt}
						/>
					</Grid.Col>
					<Grid.Col
						span={8}
						sx={{
							display: "flex",
							flexDirection: "column",
							rowGap: "1rem",
							padding: "0.25rem 0.25rem 0.25rem 0.75rem",
						}}
					>
						<CountryMedalTotals {...medalTotals} />
						<CountrySportsMedalsChart
							data={countrySportsMedals}
							keys={["bronze", "silver", "gold"]}
						/>
						<CountryGamesMedalsChart
							data={countryMedals}
							keys={["bronze", "silver", "gold"]}
						/>
					</Grid.Col>
				</Grid>
			</Container>
		</>
	);
};

export default OlympicNOC;
