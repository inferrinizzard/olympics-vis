import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import prisma from "src/db/prisma";
import type { Country, Games, MedalTotals } from "@prisma/client";

import { Box, Title } from "@mantine/core";

import { Bar } from "@nivo/bar";

import CardLink from "components/layouts/CardLink";
import { searchFilter } from "src/util";

export interface CountriesProps {
	countries: Country[];
	medalTotals: (Pick<MedalTotals, "country"> &
		Pick<Games, "game" | "year"> & { total: number })[];
}

export const getStaticProps: GetStaticProps<CountriesProps> = async () => {
	const countries = await prisma.country.findMany();

	const medalTotals = (await prisma.$queryRaw`
		SELECT game, country, total
		FROM (
			SELECT
				last10games.game AS game,
				country,
				CAST(gold + silver + bronze AS SMALLINT) AS total,
				year,
				RANK() OVER (PARTITION BY last10games.game ORDER BY gold + silver + bronze DESC) AS num
			FROM country_game_medals
			JOIN (
				SELECT game, year
				FROM games_detail
				ORDER BY year DESC, season ASC
				LIMIT 10
			) last10games
			ON country_game_medals.game = last10games.game
		) ranked
		WHERE num <= 5
		ORDER BY year, total;
		`) as CountriesProps["medalTotals"];

	return { props: { countries, medalTotals } };
};

const Countries: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
	countries,
	medalTotals,
}) => {
	const router = useRouter();
	const countrySearchFilter = searchFilter<Country>(
		["country", "name"],
		router.query.search as string,
	);

	const activeNOCs = countries
		.filter(({ status }) => status === "active")
		.filter(countrySearchFilter);
	const specialNOCs = countries
		.filter(({ status }) => status === "special")
		.filter(countrySearchFilter);
	const historicNOCs = countries
		.filter(({ status }) => status === "historic")
		.filter(countrySearchFilter);

	const NOCs = {
		Active: activeNOCs,
		Special: specialNOCs,
		Historic: historicNOCs,
	};

	const countryMedals = medalTotals.reduce(
		(gameMap, { game, country, total }) => {
			return {
				...gameMap,
				[game]: { game, ...(gameMap[game] ?? {}), [country]: total },
			};
		},
		{} as Record<string, Record<string, string | number>>,
	);

	return (
		<>
			<Head>
				<title>{"Olympics Vis - Countries"}</title>
			</Head>
			<Title order={1}>{"Countries"}</Title>
			<section>
				<Bar
					data={Object.values(countryMedals)}
					keys={[...new Set(medalTotals.map(({ country }) => country))]}
					indexBy="game"
					width={1150}
					height={500}
					margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
					valueScale={{ type: "linear" }}
					indexScale={{ type: "band" }}
					colors={{ scheme: "nivo" }}
					axisTop={{
						tickSize: 5,
						tickPadding: 5,
						tickRotation: 0,
						legend: "",
						legendPosition: "middle",
						legendOffset: -36,
					}}
					axisBottom={{
						tickSize: 5,
						tickPadding: 5,
						tickRotation: 0,
						legend: "",
						legendPosition: "middle",
						legendOffset: 32,
					}}
				/>
			</section>

			{Object.entries(NOCs).map(([nocType, nocs]) =>
				nocs.length ? (
					<section key={nocType}>
						<Title order={2}>{`${nocType} NOCs`}</Title>
						<Box
							sx={{
								display: "grid",
								gridTemplateColumns:
									nocs.length > 10
										? "repeat(auto-fit, minmax(160px, 1fr))"
										: "repeat(auto-fill, 320px)",
								gap: "1rem",
							}}
						>
							{nocs.map((country) => (
								<CardLink
									key={country.country}
									img={`/images/countries/${country.country}.svg`}
									alt={`NOC Flag for ${country.country}`}
									href={`/countries/${country.country}`}
									caption={country.country}
									secondary={country.name}
									aspectRatio="3 / 2"
									imgStyles={{
										boxShadow:
											"1px 1px 8px 1px rgba(0, 0, 0, 0.05), -1px -1px 8px 1px rgba(0, 0, 0, 0.05)",
									}}
								/>
							))}
						</Box>
					</section>
				) : undefined,
			)}
		</>
	);
};

export default Countries;
