import type { CSSProperties } from "react";

import Link from "next/link";

import { Card, CardSection, Title } from "@mantine/core";

import { Image, type ImageProps } from "components/util/Image";

import * as classes from "./CardLink.css";

export interface CardLinkProps {
	href: string;
	caption?: string;
	secondary?: string;
	hoverColour?: string;

	aspectRatio?: CSSProperties["aspectRatio"];
	imageContainerStyles?: CSSProperties;
	imageProps: ImageProps;
}

const CardLink = ({
	href,
	caption,
	secondary,
	hoverColour,
	aspectRatio = "1 / 1",
	imageContainerStyles,
	imageProps,
}: CardLinkProps) => {
	return (
		<Link
			passHref
			href={href}
			style={{ flexGrow: 1, flexBasis: "10rem", textDecoration: "none" }}
		>
			<Card
				className={classes.CardLinkCard}
				withBorder
				// style={(theme) => ({
				// 	// backgroundColor: hovered
				// 	// 	? hoverColour
				// 	// 		? theme.colors[hoverColour][1]
				// 	// 		: "white"
				// 	// 	: undefined,
				// 	// transform: hovered ? "scale(1.05)" : undefined,
				// 	// zIndex: hovered ? 1 : undefined,
				// })}
			>
				<CardSection
					className={"next-img-wrapper"}
					style={{
						...imageContainerStyles,
						position: "relative",
						width: "100%",
						aspectRatio,
						marginTop: 0,
					}}
				>
					<Image {...imageProps} fill style={{ objectFit: "contain" }} />
				</CardSection>
				{caption && (
					<Title order={3} style={{ textAlign: "center" }}>
						{caption}
					</Title>
				)}
				{secondary && (
					<Title order={5} style={{ textAlign: "center" }}>
						{secondary}
					</Title>
				)}
			</Card>
		</Link>
	);
};

export default CardLink;
