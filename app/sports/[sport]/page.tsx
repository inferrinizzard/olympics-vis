import type { NextPage } from "next";

import { Container, Grid, GridCol } from "@mantine/core";

import type { MetadataProps } from "types/next";
import { getSport } from "lib/db";

import SportsCountriesChart from "../_components/SportsCountriesChart";
import SportsEventsChart from "../_components/SportsEventsChart";
import SportsOverview from "../_components/SportsOverview";
import SportsPictogramRow from "../_components/SportsPictogramRow";

import { getAllSports } from "lib/db";

type SportParams = { sport: string };

export async function generateStaticParams() {
	const sports = await getAllSports({ select: { code: true } });

	return sports.map(({ code }) => ({ params: { sport: code } }));
}

export const generateMetadata = async ({
	params,
}: MetadataProps<SportParams>) => {
	const sportCode = (await params).sport;
	const sport = await getSport({ sport: sportCode });
	return { title: sport.name };
};

const SportPage: NextPage<{ params: SportParams }> = async ({
	params: { sport: sportCode },
}) => {
	const sport = await getSport({ sport: sportCode });

	if (!sport) {
		return null;
	}

	return (
		<Container fluid h="100%" p="xs">
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
