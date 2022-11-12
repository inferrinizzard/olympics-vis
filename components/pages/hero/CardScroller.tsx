import { useEffect, useRef } from 'react';
import Link from 'next/link';

import { Box } from '@mantine/core';

import CardLink from 'components/layouts/CardLink';
import { autoscroll } from 'src/utils/autoScroll';

interface CardScrollerProps<T> {
	data: T[];
	route: string;
	idKey: keyof T;
	imageKey: keyof T;
	direction: 1 | -1;
	color: string;
}

const CardScroller = <T extends Record<string, string | number>>({
	data,
	route,
	idKey,
	imageKey,
	direction,
	color,
}: CardScrollerProps<T>) => {
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const scrollInterval = autoscroll(scrollRef, direction * (1 + Math.random()));

		return () => clearInterval(scrollInterval);
	}, [direction]);

	return (
		<section>
			<Box ref={scrollRef} className="disable-scrollbar" w="100%" sx={{ overflowX: 'scroll' }}>
				<Box sx={{ display: 'inline-flex', flexDirection: direction > 0 ? 'row' : 'row-reverse' }}>
					{data.map(datum => (
						<Box
							key={datum[idKey]}
							m="0.25rem"
							h="13rem"
							w="13rem"
							sx={{ display: 'inline-block' }}>
							<CardLink
								href={`/${route}/${datum[idKey]}`}
								img={datum[imageKey] as string}
								alt={datum[idKey] as string}
								hoverColour={color}
							/>
						</Box>
					))}
				</Box>
			</Box>
			<Link href={`/${route}`}>{'See all →'}</Link>
		</section>
	);
};

export default CardScroller;
