import type { NextPage } from 'next';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { PrismaClient, type Games, type Sport } from '.prisma/client';

import { Image, Title } from '@mantine/core';

interface HeroProps {
	games: Games[];
	sports: Sport[];
}

export const getStaticProps: GetStaticProps<HeroProps> = async () => {
	const prisma = new PrismaClient();

	const games = await prisma.games.findMany({ orderBy: [{ year: 'desc' }, { season: 'asc' }] });

	const sports = await prisma.sport.findMany();

	return { props: { games, sports } };
};

const Hero: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ games, sports }) => {
	return (
		<main>
			<section>
				<Title order={1}>{'Olympics Vis'}</Title>
			</section>
			<section style={{ overflowX: 'hidden' }}>
				<div style={{ display: 'inline-flex' }}>
					{games.map(game => (
						<span key={game.game} style={{ width: '13rem', height: '13rem' }}>
							<Link href={`games/${game.game}`} passHref>
								<Image
									src={game.emblem}
									alt={game.game}
									fit={'contain'}
									height={'100%'}
									sx={{ cursor: 'pointer' }}
									style={{ height: '100%' }}
									styles={{ imageWrapper: { height: '100%' }, figure: { height: '100%' } }}
								/>
							</Link>
						</span>
					))}
				</div>
				<Link href="games">{'See all →'}</Link>
			</section>
			<section style={{ overflowX: 'hidden' }}>
				<div style={{ display: 'inline-flex', flexDirection: 'row-reverse' }}>
					{sports.map(sport => (
						<span key={sport.sport} style={{ width: '13rem', height: '13rem' }}>
							<Link href={`sports/${sport.sport}`} passHref>
								<Image
									src={sport.icon}
									alt={sport.sport}
									fit={'contain'}
									height={'100%'}
									sx={{ cursor: 'pointer' }}
									style={{ height: '100%' }}
									styles={{ imageWrapper: { height: '100%' }, figure: { height: '100%' } }}
								/>
							</Link>
						</span>
					))}
				</div>
				<Link href="sports">{'See all →'}</Link>
			</section>
			<section></section>
		</main>
	);
};

export default Hero;
