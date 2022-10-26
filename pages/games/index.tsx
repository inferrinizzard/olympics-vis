import { type NextPage } from 'next';
import { type GetStaticProps, type InferGetStaticPropsType } from 'next';

import { Games, PrismaClient } from '@prisma/client';

import { Title } from '@mantine/core';

import CardLink from 'components/layouts/CardLink';

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
			<Title order={1}>{'Games'}</Title>
			<section
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
					gap: '1rem',
				}}>
				{games.map(({ game, emblem }) => (
					<CardLink
						key={game}
						img={emblem}
						alt={'Olympic emblem for ' + game}
						href={`/games/${game}`}
						caption={gameName(game)}
					/>
				))}
			</section>
		</>
	);
};

export default Games;
