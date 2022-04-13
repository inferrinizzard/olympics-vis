import { type NextPage } from 'next';
import { type GetStaticProps, type InferGetStaticPropsType } from 'next';

import axios from 'axios';

import { GamesMain } from '../types';

export interface GamesProps {
	games: GamesMain;
}

export const getStaticProps: GetStaticProps<GamesProps> = () =>
	axios
		.get('https://olympicsapi.herokuapp.com/games')
		.then(res => ({ props: { games: res.data as GamesMain } }));

const Games: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ games }) => {
	return (
		<>
			<div>Games</div>
			{games.summer.map(game => (
				<div key={game}>{game}</div>
			))}
			{games.winter.map(game => (
				<div key={game}>{game}</div>
			))}
		</>
	);
};

export default Games;
