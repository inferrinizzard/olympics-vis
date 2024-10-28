import TopMedalsChart_Client from "./client";
import { getMedalsLeadersFromLastTenGames } from "./data";

const TopMedalsChart = async () => {
	const medalTotals = await getMedalsLeadersFromLastTenGames();
	const countryMedals = medalTotals.reduce(
		(gameMap, { games, country, total }) => {
			return {
				...gameMap,
				[games]: { games, ...(gameMap[games] ?? {}), [country]: total },
			};
		},
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		{} as any,
	);

	return (
		<TopMedalsChart_Client
			medalTotals={medalTotals}
			countryMedals={countryMedals}
		/>
	);
};

export default TopMedalsChart;
