import { type NextPage } from 'next';
import { type GetStaticProps, type InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { Games, PrismaClient } from '@prisma/client';

export interface GamesProps {
	games: Games[];
}

export const getStaticProps: GetStaticProps<GamesProps> = async () => {
	const prisma = new PrismaClient();

	const games = await prisma.games.findMany();
	return { props: { games } };
};

const Games: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ games }) => {
	return (
		<>
			<div>Games</div>
			{games.map(game => (
				<div key={game.game}>
					<Link href={`/games/${game}`}>{game.game}</Link>
				</div>
			))}
		</>
	);
};

export default Games;
