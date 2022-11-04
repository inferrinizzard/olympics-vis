import Link from 'next/link';

import { Card, Image, Title } from '@mantine/core';

interface CardLinkProps {
	href: string;
	img: string;
	alt: string;
	imgStyles?: {};
	caption: string;
	secondary?: string;
}

const CardLink: React.FC<CardLinkProps> = props => {
	return (
		<Link passHref href={props.href}>
			<Card sx={{ cursor: 'pointer' }}>
				<Image
					src={props.img}
					alt={props.alt}
					styles={{
						root: { height: '100%' },
						figure: { height: '100%', aspectRatio: '3 / 2' },
						imageWrapper: { height: '100%' },
					}}
					imageProps={{
						style: {
							height: '100%',
							objectFit: 'scale-down',
							...props.imgStyles,
						},
					}}
				/>
				<Title order={2}>{props.caption}</Title>
				{props.secondary && <Title order={5}>{props.secondary}</Title>}
			</Card>
		</Link>
	);
};

export default CardLink;
