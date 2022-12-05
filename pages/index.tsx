import type { NextPage } from 'next';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';

import prisma from 'src/db/prisma';
import { type Country, type Games, type Sport } from '.prisma/client';

import { Box, Container, Title } from '@mantine/core';

import CardScroller from 'components/pages/hero/CardScroller';

interface HeroProps {
	games: Games[];
	sports: Sport[];
	countries: Country[];
}

export const getStaticProps: GetStaticProps<HeroProps> = async () => {
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
		<>
			<Head>
				<title>{'Olympics Vis'}</title>
			</Head>
			<Container fluid p={0} h="100%">
				<Box
					sx={{
						position: 'absolute',
						height: '100%',
						width: '100%',
						left: 0,
						top: 0,
						opacity: '10%',
						backgroundImage:
							'url("https://upload.wikimedia.org/wikipedia/commons/a/a7/Olympic_flag.svg")',
						backgroundSize: 'contain',
					}}
				/>
				<section>
					<Title order={1}>{'Olympics Vis'}</Title>
				</section>
				<CardScroller<Games>
					data={games}
					route="games"
					idKey="game"
					imageKey="emblem"
					direction={1}
					color="green"
				/>
				{/* <CardScroller<Sport>
					data={sports}
					route="sports"
					idKey="sport"
					imageKey="icon"
					direction={-1}
					color="red"
				/>
				<CardScroller<Country>
					data={countries}
					route="countries"
					idKey="country"
					imageKey="flag"
					direction={1}
					color="blue"
				/> */}
			</Container>
		</>
	);
};

export default Hero;
