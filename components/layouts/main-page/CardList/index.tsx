import { Group, Stack, Title } from "@mantine/core";

import CardLink, { type CardLinkProps } from "../CardLink";

import * as classes from "./CardList.css";

export interface CardListProps<CardProps extends CardLinkProps> {
	title: string;
	cardData: CardProps[];
}

export const CardList = <CardProps extends CardLinkProps>({
	title,
	cardData,
}: CardListProps<CardProps>) => {
	return (
		<Stack component="section">
			<Title order={2}>{title}</Title>
			<Group className={classes.CardListGrid}>
				{cardData.map((cardProps) => (
					<CardLink
						key={`${title}_${cardProps.imageProps.code}`}
						{...cardProps}
					/>
				))}
			</Group>
		</Stack>
	);
};
