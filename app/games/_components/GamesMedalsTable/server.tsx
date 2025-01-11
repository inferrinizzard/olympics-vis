import Link from "next/link";

import {
	Title,
	Table,
	TableTbody,
	TableThead,
	TableTd,
	TableTr,
} from "@mantine/core";

import type { ParticipationRecords } from "@prisma/client";
import type { MedalType } from "types/prisma";

import GridCell from "components/layouts/sub-page/GridCell";
import { Image } from "components/util/Image";
import { HEADER_HEIGHT } from "components/shell/Header";

import * as classes from "./GamesMedalsTable.css";

interface GamesMedalsTableProps {
	countryStandings: Pick<ParticipationRecords, "country" | MedalType>[];
}

const GamesMedalsTable_Server: React.FC<GamesMedalsTableProps> = ({
	countryStandings,
}) => {
	return (
		<GridCell className={classes.GridContainer}>
			<Title order={2} p="xs">
				{"Medals Top 10"}
			</Title>
			<Table
				style={{ flexGrow: 1 }}
				stickyHeader
				stickyHeaderOffset={HEADER_HEIGHT}
				highlightOnHover
			>
				<TableThead>
					<TableTr>
						<TableTd>Country</TableTd>
						<TableTd>Gold</TableTd>
						<TableTd>Silver</TableTd>
						<TableTd>Bronze</TableTd>
						<TableTd>Total</TableTd>
					</TableTr>
				</TableThead>
				<TableTbody>
					{countryStandings.map(({ country, gold, silver, bronze }) => (
						<TableTr key={country}>
							<TableTd
								display="flex"
								style={{ alignItems: "center", gap: "0.5rem" }}
							>
								<Link
									href={`/countries/${country}`}
									style={{ color: "black", textDecoration: "auto" }}
								>
									<Image
										dir="country"
										code={country}
										alt={country}
										width={30}
										height={30}
										style={{
											objectFit: "contain",
											filter: "drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.2))",
										}}
									/>
									<span>{country}</span>
								</Link>
							</TableTd>
							<TableTd>{gold}</TableTd>
							<TableTd>{silver}</TableTd>
							<TableTd>{bronze}</TableTd>
							<TableTd>{gold + silver + bronze}</TableTd>
						</TableTr>
					))}
				</TableTbody>
			</Table>
		</GridCell>
	);
};

export default GamesMedalsTable_Server;
