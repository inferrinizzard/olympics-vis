import Link from 'next/link';

import { Card, CSSObject, Image, Title } from '@mantine/core';
import { useHover } from '@mantine/hooks';

import useAccentColour from 'src/hooks/useAccentColour';

interface CardLinkProps {
	href: string;
	img: string;
	alt: string;
	aspectRatio?: CSSObject['aspectRatio'];
	imgStyles?: {};
	caption?: string;
	secondary?: string;
	hoverColour?: string;
}

const CardLink: React.FC<CardLinkProps> = ({
	href,
	img,
	alt,
	aspectRatio,
	imgStyles,
	caption,
	secondary,
	hoverColour,
}) => {
	const { hovered, ref } = useHover();
	const { primary } = useAccentColour();

	return (
		<Link passHref href={href}>
			<Card
				ref={ref}
				sx={theme => ({
					cursor: 'pointer',
					backgroundColor: hovered
						? hoverColour
							? theme.colors[hoverColour][1]
							: primary
						: undefined,
					transform: hovered ? 'scale(1.05)' : undefined,
					zIndex: hovered ? 1 : undefined,
				})}>
				<Image
					src={img}
					alt={alt}
					styles={{
						figure: { height: '100%', aspectRatio: aspectRatio || '1 / 1' },
						imageWrapper: { height: '100%' },
					}}
					imageProps={{
						style: {
							height: '100%',
							objectFit: 'scale-down',
							...imgStyles,
						},
					}}
				/>
				{caption && <Title order={2}>{caption}</Title>}
				{secondary && <Title order={5}>{secondary}</Title>}
			</Card>
		</Link>
	);
};

export default CardLink;
