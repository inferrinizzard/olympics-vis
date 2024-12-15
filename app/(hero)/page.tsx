import Link from "next/link";

import { Box, Container, Group, Stack, Title } from "@mantine/core";

import type { Games, Sport, Country } from "types/prisma";
import { getAllGames, getAllSports, getAllCountries } from "lib/db";

import CardScroller from "./_components/CardScroller";
import { ArrowRight } from "tabler-icons-react";
import { MersenneTwister } from "lib/utils/mersenneTwister";

const HomePage = async () => {
	const games = await getAllGames();
	const countries = await getAllCountries();
	const sports = await getAllSports();

	const unixMs = +Date.now();
	const unixDays = Math.floor(unixMs / (24 * 60 * 60 * 1000));
	// @ts-ignore
	const mt = new MersenneTwister(unixDays);

	const randomGames = games[Math.floor(mt.random() * games.length)];
	const randomCountry = countries[Math.floor(mt.random() * countries.length)];
	const randomSport = sports[Math.floor(mt.random() * sports.length)];

	return (
		<Container fluid h="100%" p="xs">
			<Box
				style={{
					position: "absolute",
					height: "100%",
					width: "100%",
					left: 0,
					top: 0,
					opacity: "10%",
					backgroundImage: 'url("/images/country/shared/Olympic_flag.svg")',
					backgroundSize: "contain",
					pointerEvents: "none",
				}}
			/>
			<Box component="section">
				<Title order={1}>{"Olympics Vis"}</Title>
			</Box>
			<Stack>
				{unixDays}
				{randomGames.code}
				{randomCountry.code}
				{randomSport.code}
			</Stack>

			<Stack>
				<Title order={2}>{"Featured Games"}</Title>

				<Link passHref href="/games">
					<Group>
						<Title order={3}>{"See All"}</Title>
						<ArrowRight />
					</Group>
				</Link>
			</Stack>
			<Link passHref href="/countries">
				<Title order={3}>{"Countries"}</Title>
			</Link>
			<Link passHref href="/sports">
				<Title order={3}>{"Sports"}</Title>
			</Link>
			{/* <CardScroller<Games>
				data={games}
				route="games"
				tooltipKey={"games"}
				direction={1}
				color="green"
			/>
			<CardScroller<Sport>
				data={sports}
				route="sports"
				tooltipKey={"name"}
				direction={-1}
				color="red"
			/>
			<CardScroller<Country>
				data={countries}
				route="countries"
				tooltipKey={"name"}
				direction={1}
				color="blue"
			/> */}
		</Container>
	);
};

export default HomePage;
