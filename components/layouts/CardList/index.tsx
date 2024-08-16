import { Box, Container, Title } from "@mantine/core";

import CardLink, { type CardLinkProps } from "../CardLink";

export interface CardListProps {
	title: string;
	cardData: CardLinkProps[];
}

export const CardList = ({ title, cardData }: CardListProps) => {
	return (
		<Container component="section">
			<Title order={2}>{title}</Title>
			<Box
				display="flex"
				style={{
					flexWrap: "wrap",
					gap: "1rem",
				}}
			>
				{cardData.map((cardProps, i) => (
					<CardLink key={`${title}_${i}`} {...cardProps} />
				))}
			</Box>
		</Container>
	);
};
