import { type NextPage } from 'next';
import { type GetStaticProps, type InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import axios from 'axios';
import { getRoute } from '../api/_endpoint';

import { GamesMain } from '../types';

export interface GamesProps {
	games: GamesMain;
}

export const getStaticProps: GetStaticProps<GamesProps> = () =>
	axios.get(getRoute(['games'])).then(res => ({ props: { games: res.data as GamesMain } }));

const Games: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ games }) => {
	return (
		<>
			<div>Games</div>
			{games.summer.map(game => (
				<div key={game}>
					<Link href={`/games/${parseInt(game)}/summer`}>{game}</Link>
				</div>
			))}
			{games.winter.map(game => (
				<div key={game}>
					<Link href={`/games/${parseInt(game)}/winter`}>{game}</Link>
				</div>
			))}
		</>
	);
};

export default Games;
