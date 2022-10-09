import { RefObject, useEffect, useRef } from 'react';

import type { NextPage } from 'next';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { PrismaClient, type Country, type Games, type Sport } from '.prisma/client';

import { Image, Title } from '@mantine/core';

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
	const gamesRef = useRef<HTMLDivElement>(null);
	const sportsRef = useRef<HTMLDivElement>(null);
	const countriesRef = useRef<HTMLDivElement>(null);

	const autoscroll = (ref: RefObject<HTMLDivElement>, step: number) => {
		const scrollElement = ref?.current;
		const flexWrapper = scrollElement?.firstElementChild;
		const childWidth = flexWrapper?.firstElementChild?.clientWidth ?? 0;

		let x = 0;
		return setInterval(() => {
			if (
				(step > 0 && x > childWidth * 2) ||
				(step < 1 &&
					scrollElement &&
					scrollElement?.scrollLeft < scrollElement?.scrollWidth - childWidth * 2)
			) {
				if (step > 0) {
					flexWrapper?.firstChild && flexWrapper?.appendChild(flexWrapper?.firstChild);
					x -= childWidth;
				} else if (step < 0) {
					flexWrapper?.firstChild &&
						flexWrapper.insertBefore(flexWrapper?.firstChild, flexWrapper?.lastChild);
					x += childWidth;
				}
				scrollElement?.scrollTo({
					left: x,
				});
			}
			x += step;
			scrollElement?.scrollTo({
				left: scrollElement.scrollLeft + step,
			});
		}, 100);
	};

	useEffect(() => {
		const gamesInterval = autoscroll(gamesRef, 1);
		sportsRef?.current?.scrollTo({ left: sportsRef?.current?.scrollWidth });
		// const sportsInterval = autoscroll(sportsRef, -1);
		// const countriesInterval = autoscroll(countriesRef, 1);

		// return () => [gamesInterval, sportsInterval, countriesInterval].forEach(clearInterval);
		return () => [gamesInterval].forEach(clearInterval);
	}, []);

	return (
		<main>
			<section>
				<Title order={1}>{'Olympics Vis'}</Title>
			</section>
			<section>
				<div
					ref={gamesRef}
					className={'disable-scrollbar'}
					style={{ width: '100%', overflowX: 'scroll' }}>
					<div style={{ display: 'inline-flex' }}>
						{games.slice(0, 10).map(game => (
							<span key={game.game} style={{ width: '13rem', height: '13rem' }}>
								<Link href={`/games/${game.game}`} passHref>
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
				</div>
				<Link href="/games">{'See all →'}</Link>
			</section>
			<section>
				<div
					ref={sportsRef}
					className={'disable-scrollbar'}
					style={{ width: '100%', overflowX: 'scroll' }}>
					<div style={{ display: 'inline-flex', flexDirection: 'row-reverse' }}>
						{sports.map(sport => (
							<span key={sport.sport} style={{ width: '13rem', height: '13rem' }}>
								<Link href={`/sports/${sport.sport}`} passHref>
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
				</div>
				<Link href="/sports">{'See all →'}</Link>
			</section>
			<section>
				<div
					ref={countriesRef}
					className={'disable-scrollbar'}
					style={{ width: '100%', overflowX: 'scroll' }}>
					<div style={{ display: 'inline-flex' }}>
						{countries.map(country => (
							<span key={country.country} style={{ width: '13rem', height: '13rem' }}>
								<Link href={`/countries/${country.country}`} passHref>
									<Image
										src={country.flag}
										alt={country.country}
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
				</div>
				<Link href="/countries">{'See all →'}</Link>
			</section>
		</main>
	);
};

export default Hero;
