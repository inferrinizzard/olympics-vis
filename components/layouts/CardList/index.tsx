import { Box, Container, Title } from "@mantine/core";

import CardLink, { type CardLinkProps } from "../CardLink";

import * as classes from "./CardList.css";

export interface CardListProps {
	title: string;
	cardData: CardLinkProps[];
}

export const CardList = ({ title, cardData }: CardListProps) => {
	return (
		<Container component="section" w="100%">
			<Title order={2}>{title}</Title>
			<Box className={classes.CardListGrid}>
				{cardData.map((cardProps, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<CardLink key={`${title}_${i}`} {...cardProps} />
				))}
			</Box>
		</Container>
	);
};
