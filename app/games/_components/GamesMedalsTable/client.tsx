import { Title, Table } from "@mantine/core";

import type { ParticipationRecords } from "@prisma/client";
import type { MedalType } from "types/prisma";

import GridCell from "components/grid/GridCell";
import { Image } from "components/util/Image";

interface GamesMedalsTableProps {
	countryStandings: Pick<ParticipationRecords, "country" | MedalType>[];
}

const GamesMedalsTable_Client: React.FC<GamesMedalsTableProps> = ({
	countryStandings,
}) => {
	return (
		<GridCell h="100%" display="flex" style={{ flexDirection: "column" }}>
			<Title order={2} p="xs">
				{"Medals Top 10"}
			</Title>
			<Table p="xs" style={{ flexGrow: 1 }}>
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
								<Image
									dir="country"
									code={country}
									alt={country}
									width={30}
									height={30}
									style={{ display: "inline-block" }}
								/>
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

export default GamesMedalsTable_Client;
