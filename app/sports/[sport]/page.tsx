import { Container, Grid, GridCol } from "@mantine/core";
import type { NextPage } from "next";

import { getSport, getSportEventCountByGame, getMedalsBySport } from "lib/db";
import { getWikipediaExcerpt, getWikipediaUrl } from "lib/utils/wikipedia";

// import BackButton from "components/layouts/BackButton";
import SportsCountriesChart from "../_components/SportsCountriesChart";
import SportsEventsChart from "../_components/SportsEventsChart";
import SportsOverview from "../_components/SportsOverview";

import { getAllSports } from "lib/db";

export async function generateStaticParams() {
	const sports = await getAllSports();

	return sports.map((params) => ({ params }));
}

export const SportPage: NextPage<{ params: { sport: string } }> = async ({
	params: { sport: sportId },
}) => {
	const sport = await getSport({ sport: sportId });

	if (!sport) {
		return null;
	}

	const countEvents = await getSportEventCountByGame({ sport: sportId });
	const numEvents = countEvents
		.reverse()
		.reduce(
			(acc, { game, _count: { sport: count } }) =>
				count ? { ...acc, [game]: count } : acc,
			{},
		);

	const countrySportsMedals = await getMedalsBySport({ sport: sportId });

	const wikipediaExcerpt = await getWikipediaExcerpt(
		getWikipediaUrl("sports", sport?.name),
	);

	return (
		<Container fluid style={{ height: "100%" }}>
			{/* <BackButton /> */}
			<Grid mt={0}>
				<GridCol>
					<SportsOverview sport={sport} wikipediaExcerpt={wikipediaExcerpt} />
				</GridCol>
				<GridCol>
					<SportsEventsChart sport={sport} numEvents={numEvents} />
				</GridCol>
				<GridCol>
					<SportsCountriesChart countrySportsMedals={countrySportsMedals} />
				</GridCol>
			</Grid>
		</Container>
	);
};

export default SportPage;
