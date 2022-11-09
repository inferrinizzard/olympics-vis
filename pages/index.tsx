import { useEffect, useRef, type RefObject } from 'react';

import type { NextPage } from 'next';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import prisma from 'src/db/prisma';
import { type Country, type Games, type Sport } from '.prisma/client';

import { Image, Title } from '@mantine/core';

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
	const gamesRef = useRef<HTMLDivElement>(null);
	const sportsRef = useRef<HTMLDivElement>(null);
	const countriesRef = useRef<HTMLDivElement>(null);

	const autoscroll = (ref: RefObject<HTMLDivElement>, step: number) => {
		const scrollElement = ref?.current;
		const flexWrapper = scrollElement?.firstElementChild;
		const targetElement = step > 0 ? flexWrapper?.firstElementChild : flexWrapper?.lastElementChild;
		const secondElement = flexWrapper?.children[step > 0 ? 1 : flexWrapper.childElementCount - 2];
		const childWidth = flexWrapper?.firstElementChild?.clientWidth ?? 0;

		const headObserverOptions = {
			root: scrollElement,
			rootMargin: `${childWidth}px`,
			threshold: 0.0,
		};

		const positiveLoop = (
			entries: IntersectionObserverEntry[],
			headObserver: IntersectionObserver
		) => {
			const targetEntry = entries.find(entry => !entry.isIntersecting);
			if (!targetEntry) return;
			if (step > 0) {
				flexWrapper?.appendChild(targetEntry.target);
				scrollElement?.scrollTo({ left: childWidth });
				flexWrapper?.firstElementChild && headObserver.observe(flexWrapper.firstElementChild);
			} else if (step < 0) {
				flexWrapper?.firstChild &&
					flexWrapper.insertBefore(flexWrapper.firstChild, targetEntry.target);
				scrollElement?.scrollTo({ left: scrollElement.scrollWidth - childWidth });
				flexWrapper?.lastElementChild && headObserver.observe(flexWrapper.lastElementChild);
			}
			headObserver.unobserve(targetEntry.target);
		};

		const headObserver = new IntersectionObserver(positiveLoop, headObserverOptions);
		targetElement && headObserver.observe(targetElement);

		return setInterval(
			() =>
				window.requestAnimationFrame(() =>
					scrollElement?.scrollTo({ left: scrollElement.scrollLeft + step })
				),
			100
		);
	};

	useEffect(() => {
		const gamesInterval = autoscroll(gamesRef, 1 + Math.random());
		sportsRef?.current?.scrollTo({ left: sportsRef.current.scrollWidth });
		const sportsInterval = autoscroll(sportsRef, -1 - Math.random());
		const countriesInterval = autoscroll(countriesRef, 1 + Math.random());

		return () => [gamesInterval, sportsInterval, countriesInterval].forEach(clearInterval);
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
						{games.map(game => (
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
