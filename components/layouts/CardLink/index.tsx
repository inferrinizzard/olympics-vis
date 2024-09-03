import type { CSSProperties } from "react";

import Link from "next/link";
import NextImage from "next/image";

import { Card, CardSection, Title } from "@mantine/core";

import * as classes from "./CardLink.css";

export interface CardLinkProps {
	href: string;
	img: string;
	alt: string;
	aspectRatio?: CSSProperties["aspectRatio"];
	imgStyles?: CSSProperties;
	caption?: string;
	secondary?: string;
	hoverColour?: string;

	imageElement?: JSX.Element;
}

const CardLink = ({
	href,
	img,
	alt,
	aspectRatio = "1 / 1",
	imgStyles,
	caption,
	secondary,
	hoverColour,
	imageElement,
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
					className="next-img-wrapper"
					style={{
						...imgStyles,
						position: "relative",
						width: "100%",
						aspectRatio,
						marginTop: 0,
					}}
				>
					{imageElement ?? (
						<NextImage
							src={img}
							alt={alt}
							// {...imageProps}
							fill
							sizes="100vw"
						/>
					)}
				</CardSection>
				{caption && (
					<Title order={3} style={{ textAlign: "center" }}>
						{caption}
					</Title>
				)}
				{secondary && <Title order={5}>{secondary}</Title>}
			</Card>
		</Link>
	);
};

export default CardLink;
