import { useEffect, useRef } from 'react';
import Link from 'next/link';

import { Box, Tooltip } from '@mantine/core';
import { useVirtualizer } from '@tanstack/react-virtual';

import CardLink from 'components/layouts/CardLink';
import AutoScroller from 'src/utils/Autoscroller';

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
	// const scrollRef = useRef<HTMLDivElement>(null);
	// const virtualizeWrapperRef = useRef<HTMLDivElement>(null);

	// const virtualizer = useVirtualizer({
	// 	horizontal: true,
	// 	count: data.length,
	// 	getScrollElement: () => virtualizeWrapperRef.current,
	// 	estimateSize: () => 16 * 13.5, // ref: ITEM, 16px per rem
	// 	overscan: 3,
	// });

	// useEffect(() => {
	// 	const autoscroller = new AutoScroller(scrollRef, direction * (1 + Math.random()));
	// 	autoscroller.start();

	// 	return () => autoscroller.close();
	// }, [direction]);

	return (
		<>
			{/* <Box
				ref={scrollRef}
				component="section"
				className="disable-scrollbar"
				w="100%"
				sx={{ overflowX: 'scroll' }}>
				<Box
					ref={virtualizeWrapperRef}
					w={virtualizer.getTotalSize()}
					sx={{ display: 'inline-flex', flexDirection: direction > 0 ? 'row' : 'row-reverse' }}>
					{virtualizer.getVirtualItems().map(item => {
						const datum = data[item.index];
						return (
							<Tooltip key={datum[idKey]} label={datum[idKey]} position="bottom">
								<Box // ITEM: width + left & right margin
									m="0.25rem"
									w="13rem"
									h="13rem">
									<CardLink
										href={`/${route}/${datum[idKey]}`}
										img={datum[imageKey] as string}
										alt={datum[idKey] as string}
										hoverColour={color}
									/>
								</Box>
							</Tooltip>
						);
					})}
				</Box>
			</Box>
			<Link href={`/${route}`}>{'See all →'}</Link> */}
		</>
	);
};

export default CardScroller;
