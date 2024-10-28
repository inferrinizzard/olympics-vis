import type { SportProps } from "types";

import SportsEventsChart_Client from "./client";
import { getSportEventCountByGame } from "./data";

const SportsEventsChart = async ({ sport }: SportProps) => {
	const countEvents = await getSportEventCountByGame({ sport: sport.code });
	const numEvents = countEvents.reduceRight(
		(acc, { game, _count: { sport: count } }) => {
			if (count) {
				acc[game] = count;
			}
			return acc;
		},
		{},
	);

	return <SportsEventsChart_Client sport={sport} numEvents={numEvents} />;
};

export default SportsEventsChart;
