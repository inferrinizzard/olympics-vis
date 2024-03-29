import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import { Box, Title, Tooltip } from '@mantine/core';

import CardLink from 'components/layouts/CardLink';
import AutoScroller from 'src/utils/Autoscroller';

interface CardScrollerProps<T> {
	data: T[];
	route: string;
	idKey: keyof T;
	img: (t: T) => string;
	tooltip: (t: T) => string;
	direction: 1 | -1;
	color: string;
}

const CardScroller = <T extends Record<string, string | number>>({
	data,
	route,
	idKey,
	img,
	tooltip,
	direction,
	color,
}: CardScrollerProps<T>) => {
	const [start, setStart] = useState(0);
	const [length, setLength] = useState(1);

	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const autoscroller = new AutoScroller(scrollRef, direction * (1 + Math.random()), setStart);
		autoscroller.start();

		setLength(Math.floor((scrollRef?.current?.scrollWidth ?? 0) / (13.5 * 16)) + 3);
		window.addEventListener('resize', () =>
			setLength(Math.floor((scrollRef?.current?.scrollWidth ?? 0) / (13.5 * 16)) + 3)
		);

		return () => autoscroller.close();
	}, [direction]);

	return (
		<>
			<Box
				ref={scrollRef}
				component="section"
				className="disable-scrollbar"
				w="100%"
				sx={{ overflowX: 'scroll' }}>
				<Box sx={{ display: 'inline-flex', flexDirection: direction > 0 ? 'row' : 'row-reverse' }}>
					{data.slice(0, length).map((_, i) => {
						const datum = data[(start + i) % data.length];
						return (
							<Tooltip key={datum[idKey]} label={tooltip(datum)} position="bottom">
								<Box m="0.25rem" w="13rem" h="13rem">
									<CardLink
										href={`/${route}/${datum[idKey]}`}
										img={img(datum)}
										alt={datum[idKey] as string}
										hoverColour={color}
										nextImageProps={{ priority: true }}
									/>
								</Box>
							</Tooltip>
						);
					})}
				</Box>
			</Box>
			<Link passHref href={`/${route}`}>
				<Title
					order={4}
					m="1rem"
					w="fit-content"
					sx={{ position: 'relative', zIndex: 1, cursor: 'pointer' }}>
					{'See all →'}
				</Title>
			</Link>
		</>
	);
};

export default CardScroller;
