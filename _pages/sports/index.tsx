import type { NextPage } from "next";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { Box, Title } from "@mantine/core";

import type { Sport } from "@prisma/client";
import { getAllSports, getSportWithSeason } from "lib/db";
import { searchFilter } from "lib/util";

import CardLink from "components/layouts/CardLink";

export interface SportsProps {
	sports: Sport[];
	currentSports: {
		summer: Sport["sport"][];
		winter: Sport["sport"][];
	};
}

export const getStaticProps: GetStaticProps<SportsProps> = async () => {
	const sports = await getAllSports();

	const sportsList = await getSportWithSeason();

	const currentSports = sportsList.reduce(
		(acc, { season, sport }) => ({ ...acc, [season]: sport }),
		{} as SportsProps["currentSports"],
	);

	return { props: { sports, currentSports } };
};

const Sports: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
	sports,
	currentSports,
}) => {
	const router = useRouter();
	const sportsSearchFilter = searchFilter<Sport>(
		["sport", "name"],
		router.query.search as string,
	);

	const groupedSports = sports.reduce(
		(acc, sport) => {
			if (currentSports.summer.includes(sport.sport)) {
				return { ...acc, summer: [...acc.summer, sport] };
			}
			if (currentSports.winter.includes(sport.sport)) {
				return { ...acc, winter: [...acc.winter, sport] };
			}
			return { ...acc, historic: [...acc.historic, sport] };
		},
		{
			summer: [],
			winter: [],
			historic: [],
		} as Record<string, Sport[]>,
	);

	const filteredSports = Object.entries(groupedSports).map(
		([group, sports]) =>
			[group, sports.filter(sportsSearchFilter)] as [string, Sport[]],
	);

	return (
		<>
			<Head>
				<title>{"Olympics Vis - Sports"}</title>
			</Head>
			<Title order={1}>{"Sports"}</Title>
			{filteredSports.map(([group, sportList]) =>
				sportList.length ? (
					<section key={group}>
						<Title order={2}>
							{group.slice(0, 1).toUpperCase() + group.slice(1)}
						</Title>
						<Box
							sx={{
								display: "grid",
								gridTemplateColumns:
									sportList.length > 10
										? "repeat(auto-fit, minmax(200px, 1fr))"
										: "repeat(auto-fill, 400px)",
								gap: "1rem",
							}}
						>
							{sportList.map(({ sport, icon, name }) => (
								<CardLink
									key={sport}
									img={`/images/sports/${sport}.svg`}
									alt={`Icon for ${sport}`}
									href={`/sports/${sport}`}
									caption={name}
								/>
							))}
						</Box>
					</section>
				) : undefined,
			)}
		</>
	);
};

export default Sports;