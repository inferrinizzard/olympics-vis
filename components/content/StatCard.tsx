import type { CSSProperties } from "react";
import { Box, Paper, Text, Title } from "@mantine/core";

export interface StatCardProps {
	Icon: React.ComponentType<{ style: CSSProperties }>;
	title: string;
	text: string | number | null;
}

const StatCard = ({ Icon, title, text }: StatCardProps) => {
	if (!text) {
		return null;
	}

	return (
		<Paper p="sm" maw="24rem" miw="12rem" style={{ flexGrow: 1 }}>
			<Box style={{ display: "flex", columnGap: "0.5rem" }}>
				<Box style={{ display: "flex", alignContent: "center" }}>
					<Icon style={{ height: "3rem", width: "100%" }} />
				</Box>
				<Box>
					<Title order={5}>{title}</Title>
					<Text>{text || "lorem ipsum"}</Text>
				</Box>
			</Box>
		</Paper>
	);
};

export default StatCard;
