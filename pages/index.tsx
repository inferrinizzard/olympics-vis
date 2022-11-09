import type { NextPage } from 'next';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';

import { PrismaClient, type Country, type Games, type Sport } from '.prisma/client';

import { Title } from '@mantine/core';

import CardScroller from 'components/pages/hero/CardScroller';

interface HeroProps {
	games: Games[];
	sports: Sport[];
	countries: Country[];
}

export const getStaticProps: GetStaticProps<HeroProps> = async () => {
	const prisma = new PrismaClient();

	const games = await prisma.games.findMany({ orderBy: [{ year: 'desc' }, { season: 'asc' }] });

	const sports = await prisma.sport.findMany();

	const countries = await prisma.country.findMany();

	return { props: { games, sports, countries } };
};

const Hero: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
	games,
	sports,
	countries,
}) => {
	return (
		<main>
			<section>
				<Title order={1}>{'Olympics Vis'}</Title>
			</section>
			<CardScroller<Games>
				data={games}
				route="games"
				idKey="game"
				imageKey="emblem"
				direction={1}
			/>
			<CardScroller<Sport>
				data={sports}
				route="sports"
				idKey="sport"
				imageKey="icon"
				direction={-1}
			/>
			<CardScroller<Country>
				data={countries}
				route="countries"
				idKey="country"
				imageKey="flag"
				direction={1}
			/>
		</main>
	);
};

export default Hero;
