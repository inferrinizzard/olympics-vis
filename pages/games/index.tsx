import { type NextPage } from 'next';
import { type GetStaticProps, type InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { Games, PrismaClient } from '@prisma/client';

import { Card, Title, Image } from '@mantine/core';

export interface GamesProps {
	games: Games[];
}

export const getStaticProps: GetStaticProps<GamesProps> = async () => {
	const prisma = new PrismaClient();

	const games = await prisma.games.findMany();
	return { props: { games: games.sort((a, b) => (a.year < b.year ? 1 : -1)) } };
};

const Games: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ games }) => {
	const gameName = (gamesId: string) => {
		const slugs = gamesId.split('-');
		if (/^\d{4}/.test(gamesId)) {
			let [year, season] = slugs;
			season = season[0].toUpperCase() + season.slice(1);
			return `${season} ${year}`;
		}
		const year = slugs.pop();
		const city = slugs.map(slug => slug[0].toUpperCase() + slug.slice(1)).join(' ');

		return `${city} ${year}`;
	};

	return (
		<>
			<div>Games</div>
			<main style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '1rem' }}>
				{games.map(({ game, emblem }) => (
					<div key={game}>
						<Link passHref href={`/games/${game}`}>
							<Card sx={{ cursor: 'pointer', height: '20vh' }}>
								<Title order={2}>{`${gameName(game)}`}</Title>
								<Image
									src={emblem}
									alt={'Olympic emblem for ' + game}
									fit={'contain'}
									height={'100%'}
									styles={() => ({
										root: { height: '100%' },
										figure: { height: '100%' },
										imageWrapper: { height: '100%' },
									})}
								/>
							</Card>
						</Link>
					</div>
				))}
			</main>
		</>
	);
};

export default Games;
