import type { NextPage } from "next";
import { Container, Grid, GridCol } from "@mantine/core";

import { getSport } from "lib/db";
import { getWikipediaExcerpt } from "lib/utils/wikipedia";

// import BackButton from "components/layouts/BackButton";
import SportsCountriesChart from "../_components/SportsCountriesChart";
import SportsEventsChart from "../_components/SportsEventsChart/client";
import SportsOverview from "../_components/SportsOverview";

import { getAllSports } from "lib/db";

export async function generateStaticParams() {
	const sports = await getAllSports({ select: { code: true } });

	return sports.map(({ code }) => ({ params: { sport: code } }));
}

const SportPage: NextPage<{ params: { sport: string } }> = async ({
	params: { sport: sportCode },
}) => {
	const sport = await getSport({ sport: sportCode });

	if (!sport) {
		return null;
	}

	const wikipediaExcerpt = await getWikipediaExcerpt(sport.page_name);

	return (
		<Container fluid style={{ height: "100%" }}>
			{/* <BackButton /> */}
			<Grid mt={0}>
				<GridCol>
					<SportsOverview sport={sport} wikipediaExcerpt={wikipediaExcerpt} />
				</GridCol>
				<GridCol>{/* <SportsEventsChart sport={sport}  /> */}</GridCol>
				<GridCol>
					<SportsCountriesChart sport={sport} />
				</GridCol>
			</Grid>
		</Container>
	);
};

export default SportPage;
