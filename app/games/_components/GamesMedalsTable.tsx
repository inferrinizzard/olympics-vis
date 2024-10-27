import { Image, Title, Table } from "@mantine/core";

import type { Country } from "@prisma/client";

import GridCell from "components/grid/GridCell";

interface GamesMedalsTableProps {
	countryMedals: (CountryMedals & { country_detail: Country })[];
}

const GamesMedalsTable: React.FC<GamesMedalsTableProps> = ({
	countryMedals,
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
					{Object.values(countryMedals)
						.slice(0, 10)
						.map(({ country, gold, silver, bronze, country_detail }) => (
							<tr key={country}>
								<td>
									<Image
										src={country_detail.flag}
										alt={country}
										width={30}
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

export default GamesMedalsTable;
