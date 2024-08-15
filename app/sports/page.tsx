import { Title } from "@mantine/core";

import { getAllSports, getSportWithSeason } from "lib/db";

export const SportsAll = async () => {
	const sports = await getAllSports();

	// const sportsList = await getSportWithSeason();

	return (
		<>
			<Title order={1}>{"Sports"}</Title>
			{sports.map(({ sport, name }) => (
				<div key={sport}>{sport}</div>
			))}
		</>
	);
};

export default SportsAll;
