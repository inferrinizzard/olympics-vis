import Link from 'next/link';
import Image from 'next/image';

import { Box, Card, CSSObject, Title } from '@mantine/core';
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
	aspectRatio = '1 / 1',
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
				h="100%"
				p="1rem"
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
				<Box className="next-img-wrapper" sx={{ position: 'relative', aspectRatio, ...imgStyles }}>
					<Image src={img} alt={alt} layout="fill" />
				</Box>
				{caption && <Title order={3}>{caption}</Title>}
				{secondary && <Title order={5}>{secondary}</Title>}
			</Card>
		</Link>
	);
};

export default CardLink;
