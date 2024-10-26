import { Box, Container, Title } from "@mantine/core";

import type { Games, Sport, Country } from "@prisma/client";
import { getAllGames, getAllSports, getAllCountries } from "lib/db";

import CardScroller from "./_components/CardScroller";

const HomePage = async () => {
	const games = await getAllGames({
		orderBy: [{ year: "desc" }, { season: "asc" }],
	});

	const sports = await getAllSports();

	const countries = await getAllCountries();

	return (
		<Container fluid p={0} h="100%">
			<Box
				style={{
					position: "absolute",
					height: "100%",
					width: "100%",
					left: 0,
					top: 0,
					opacity: "10%",
					backgroundImage:
						'url("https://upload.wikimedia.org/wikipedia/commons/a/a7/Olympic_flag.svg")',
					backgroundSize: "contain",
				}}
			/>
			<section>
				<Title order={1}>{"Olympics Vis"}</Title>
			</section>
			<CardScroller<Games>
				data={games}
				route="games"
				idKey="game"
				tooltipKey={"game"}
				direction={1}
				color="green"
			/>
			<CardScroller<Omit<Sport, "icon">>
				data={sports}
				route="sports"
				idKey="sport"
				tooltipKey={"name"}
				direction={-1}
				color="red"
			/>
			<CardScroller<Country>
				data={countries}
				route="countries"
				idKey="country"
				tooltipKey={"name"}
				direction={1}
				color="blue"
			/>
		</Container>
	);
};

export default HomePage;