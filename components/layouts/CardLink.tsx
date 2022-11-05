import Link from 'next/link';

import { Card, CSSObject, Image, Title } from '@mantine/core';

interface CardLinkProps {
	href: string;
	img: string;
	alt: string;
	aspectRatio?: CSSObject['aspectRatio'];
	imgStyles?: {};
	caption: string;
	secondary?: string;
}

const CardLink: React.FC<CardLinkProps> = ({
	href,
	img,
	alt,
	aspectRatio,
	imgStyles,
	caption,
	secondary,
}) => {
	return (
		<Link passHref href={href}>
			<Card sx={{ cursor: 'pointer' }}>
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
				<Title order={2}>{caption}</Title>
				{secondary && <Title order={5}>{secondary}</Title>}
			</Card>
		</Link>
	);
};

export default CardLink;
