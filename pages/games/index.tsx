import { type NextPage } from 'next';
import { type GetStaticProps, type InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import axios from 'axios';
import { getRoute } from 'pages/api/_endpoint';

import { GamesMain } from 'types/api';

export interface GamesProps {
	games: string[];
}

export const getStaticProps: GetStaticProps<GamesProps> = () =>
	axios.get(getRoute(['games'])).then(res => ({ props: { games: res.data } }));

const Games: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ games }) => {
	return (
		<>
			<div>Games</div>
			{games.map(game => (
				<div key={game}>
					<Link href={`/games/${game}`}>{game}</Link>
				</div>
			))}
			{/* {games.winter.map(game => (
				<div key={game}>
					<Link href={`/games/${parseInt(game)}/winter`}>{game}</Link>
				</div>
			))} */}
		</>
	);
};

export default Games;
