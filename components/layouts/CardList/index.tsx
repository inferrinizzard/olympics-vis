import { Box, Container, Title } from "@mantine/core";

import CardLink, { type CardLinkProps } from "../CardLink";

import * as classes from "./CardList.css";

export interface CardListProps<CardProps extends CardLinkProps> {
	title: string;
	cardData: CardProps[];
	renderCardLink?: (props: CardProps) => JSX.Element;
}

export const CardList = <CardProps extends CardLinkProps>({
	title,
	cardData,
	renderCardLink,
}: CardListProps<CardProps>) => {
	return (
		<Container component="section" w="100%">
			<Title order={2}>{title}</Title>
			<Box className={classes.CardListGrid}>
				{cardData.map(
					renderCardLink ??
						((cardProps, i) => (
							<CardLink key={`${title}_${i}`} {...cardProps} />
						)),
				)}
			</Box>
		</Container>
	);
};
