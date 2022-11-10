import { useEffect, useRef } from 'react';

import Link from 'next/link';

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
			<div
				ref={scrollRef}
				className="disable-scrollbar"
				style={{ width: '100%', overflowX: 'scroll' }}>
				<div
					style={{ display: 'inline-flex', flexDirection: direction > 0 ? 'row' : 'row-reverse' }}>
					{data.map(datum => (
						<span key={datum[idKey]} style={{ width: '13rem', height: '13rem', margin: '0.25rem' }}>
							<CardLink
								href={`/${route}/${datum[idKey]}`}
								img={datum[imageKey] as string}
								alt={datum[idKey] as string}
								hoverColour={color}
							/>
						</span>
					))}
				</div>
			</div>
			<Link href={`/${route}`}>{'See all →'}</Link>
		</section>
	);
};

export default CardScroller;
