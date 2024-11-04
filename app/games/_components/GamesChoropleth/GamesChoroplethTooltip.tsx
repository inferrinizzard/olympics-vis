import type { ChoroplethBoundFeature } from "@nivo/geo";

import type { ParticipationRecords } from "@prisma/client";
import type { AthleteSex } from "types/prisma";

import * as classes from "./GamesChoropleth.css";
import { Box, Group } from "@mantine/core";

interface GamesChoroplethTooltipProps {
	feature: ChoroplethBoundFeature;
}

export const GamesChoroplethToolip = ({
	feature,
}: GamesChoroplethTooltipProps) => {
	if (!feature.value) {
		return null;
	}

	const data = feature.data as Pick<ParticipationRecords, AthleteSex> & {
		id: string;
		total: number;
	};

	return (
		<Box className={classes.Tooltip}>
			<Group>{feature.label}</Group>
			<Group justify="space-between">
				<span>{"Men:"}</span>
				<span>{feature.data.men}</span>
			</Group>
			<Group justify="space-between">
				<span>{"Women:"}</span>
				<span>{feature.data.women}</span>
			</Group>
			<Group justify="space-between">
				<span>{"Total:"}</span>
				<span>{feature.value}</span>
			</Group>
		</Box>
	);
};
