import { useEffect, useRef } from 'react';

import Link from 'next/link';

import { Image } from '@mantine/core';
import { autoscroll } from 'src/utils/autoScroll';

interface CardScrollerProps<T> {
	data: T[];
	route: string;
	idKey: keyof T;
	imageKey: keyof T;
	direction: 1 | -1;
}

const CardScroller = <T extends Record<string, string | number>>({
	data,
	route,
	idKey,
	imageKey,
	direction,
}: CardScrollerProps<T>) => {
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const scrollInterval = autoscroll(scrollRef, direction * (1 + Math.random()));
		if (direction < 0) {
			scrollRef?.current?.scrollTo({ left: scrollRef.current.scrollWidth });
		}

		return () => clearInterval(scrollInterval);
	}, [direction]);

	return (
		<section>
			<div
				ref={scrollRef}
				className="disable-scrollbar"
				style={{ width: '100%', overflowX: 'scroll' }}>
				<div style={{ display: 'inline-flex' }}>
					{data.map(datum => (
						<span key={datum[idKey]} style={{ width: '13rem', height: '13rem' }}>
							<Link href={`/${route}/${datum[idKey]}`} passHref>
								<Image
									src={datum[imageKey] as string}
									alt={datum[idKey] as string}
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
			<Link href={`/${route}`}>{'See all →'}</Link>
		</section>
	);
};

export default CardScroller;
