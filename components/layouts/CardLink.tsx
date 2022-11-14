import Link from 'next/link';
import Image from 'next/image';

import { Card, createStyles, CSSObject, Title } from '@mantine/core';
import { useHover } from '@mantine/hooks';

import useAccentColour from 'src/hooks/useAccentColour';

const useStyles = createStyles(() => ({
	wrapper: {
		'& > span': {
			'& > img': {
				objectFit: 'scale-down',
			},
		},
	},
}));

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
	const { classes } = useStyles();

	return (
		<Link passHref href={href}>
			<Card
				ref={ref}
				h="100%"
				className={classes.wrapper}
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
				<Image src={img} alt={alt} layout="fill" />
				{caption && <Title order={2}>{caption}</Title>}
				{secondary && <Title order={5}>{secondary}</Title>}
			</Card>
		</Link>
	);
};

export default CardLink;
