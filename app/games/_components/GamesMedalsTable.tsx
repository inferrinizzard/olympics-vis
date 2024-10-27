import { Image, Title, Table } from "@mantine/core";

import type { ParticipationRecords } from "@prisma/client";
import type { MedalType } from "types/prisma";

import GridCell from "components/grid/GridCell";

interface GamesMedalsTableProps {
	countryStandings: Pick<ParticipationRecords, "country" | MedalType>[];
}

const GamesMedalsTable: React.FC<GamesMedalsTableProps> = ({
	countryStandings,
}) => {
	return (
		<GridCell>
			<Title order={2} p="xs">
				{"Medals Top 10"}
			</Title>
			<Table p="xs">
				<tbody>
					<tr>
						<td>Country</td>
						<td>Gold</td>
						<td>Silver</td>
						<td>Bronze</td>
						<td>Total</td>
					</tr>
					{countryStandings.map(({ country, gold, silver, bronze }) => (
						<tr key={country}>
							<td>
								{/* <Image
									src={country_detail.flag}
									alt={country}
									width={30}
									style={{ display: "inline-block" }}
								/> */}
								<span>{country}</span>
							</td>
							<td>{gold}</td>
							<td>{silver}</td>
							<td>{bronze}</td>
							<td>{gold + silver + bronze}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</GridCell>
	);
};

export default GamesMedalsTable;
