import type { CSSProperties } from "react";

import Link from "next/link";
import Image, { type ImageProps } from "next/image";

import { Card, CardSection, Title } from "@mantine/core";

interface CardLinkProps {
	href: string;
	img: string;
	alt: string;
	aspectRatio?: CSSProperties["aspectRatio"];
	imgStyles?: CSSProperties;
	caption?: string;
	secondary?: string;
	hoverColour?: string;
	nextImageProps?: Partial<ImageProps>;
}

const CardLink: React.FC<CardLinkProps> = ({
	href,
	img,
	alt,
	aspectRatio = "1 / 1",
	imgStyles,
	caption,
	secondary,
	hoverColour,
	nextImageProps,
}) => {
	return (
		<Link passHref href={href}>
			<Card
				h="100%"
				maw="12.5rem"
				p="1rem"
				shadow="sm"
				padding="lg"
				radius="lg"
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
				display="flex"
				style={{ justifyContent: "center", cursor: "pointer" }}
			>
				<CardSection
					className="next-img-wrapper"
					style={{ position: "relative", aspectRatio, ...imgStyles }}
				>
					<Image src={img} alt={alt} layout="fill" {...nextImageProps} />
				</CardSection>
				{caption && (
					<Title
						order={3}
						style={{ textDecoration: "none", textAlign: "center" }}
					>
						{caption}
					</Title>
				)}
				{secondary && <Title order={5}>{secondary}</Title>}
			</Card>
		</Link>
	);
};

export default CardLink;
