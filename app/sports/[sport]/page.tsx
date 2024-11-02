import type { NextPage } from "next";
import { Container, Grid, GridCol } from "@mantine/core";

import { getSport } from "lib/db";

// import BackButton from "components/layouts/BackButton";
import SportsCountriesChart from "../_components/SportsCountriesChart";
import SportsEventsChart from "../_components/SportsEventsChart";
import SportsOverview from "../_components/SportsOverview";
import SportsPictogramRow from "../_components/SportsPictogramRow";

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

	return (
		<Container fluid h="100%" p="xs">
			{/* <BackButton /> */}
			<Grid mt={0}>
				<GridCol>
					<SportsOverview sport={sport} />
				</GridCol>
				<GridCol>
					<SportsPictogramRow sport={sport} />
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
