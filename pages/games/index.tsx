import { type NextPage } from 'next';
import { type GetStaticProps, type InferGetStaticPropsType } from 'next';

import prisma from 'src/db/prisma';
import { type Games } from '@prisma/client';

import { Title } from '@mantine/core';

import CardLink from 'components/layouts/CardLink';
import { getGameName } from 'src/util';

export interface GamesProps {
	games: Games[];
}

export const getStaticProps: GetStaticProps<GamesProps> = async () => {
	const games = await prisma.games.findMany();

	return { props: { games: games.sort((a, b) => (a.year < b.year ? 1 : -1)) } };
};

const Games: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ games }) => {
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
						caption={getGameName(game)}
					/>
				))}
			</section>
		</>
	);
};

export default Games;
