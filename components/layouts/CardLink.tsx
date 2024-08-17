import Link from "next/link";
import Image, { type ImageProps } from "next/image";

import {
	Box,
	Card,
	Title,
	type CSSObject,
	type MantineNumberSize,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";

import useAccentColour from "lib/hooks/useAccentColour";

interface CardLinkProps {
	href: string;
	img: string;
	alt: string;
	aspectRatio?: CSSObject["aspectRatio"];
	imgStyles?: {};
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
	const { hovered, ref } = useHover();
	const { primary } = useAccentColour();

	return (
		<Link passHref href={href}>
			<Card
				ref={ref}
				h="100%"
				p={"1rem" as MantineNumberSize}
				sx={(theme) => ({
					cursor: "pointer",
					backgroundColor: hovered
						? hoverColour
							? theme.colors[hoverColour][1]
							: primary
						: undefined,
					transform: hovered ? "scale(1.05)" : undefined,
					zIndex: hovered ? 1 : undefined,
					borderRadius: "1rem",
				})}
			>
				<Box
					className="next-img-wrapper"
					sx={{ position: "relative", aspectRatio, ...imgStyles }}
				>
					<Image src={img} alt={alt} {...nextImageProps} fill sizes="100vw" />
				</Box>
				{caption && <Title order={3}>{caption}</Title>}
				{secondary && <Title order={5}>{secondary}</Title>}
			</Card>
		</Link>
	);
};

export default CardLink;
