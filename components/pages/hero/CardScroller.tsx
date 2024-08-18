"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { Box, Title, Tooltip } from "@mantine/core";

import CardLink from "components/layouts/CardLink";
import AutoScroller from "lib/utils/Autoscroller";
import { getGameImage, getGameName } from "lib/util";

interface CardScrollerProps<T> {
	data: T[];
	route: string;
	idKey: keyof T;
	tooltipKey: string;
	direction: 1 | -1;
	color: string;
}

const CardScroller = <T extends Record<string, string | number>>({
	data,
	route,
	idKey,
	tooltipKey,
	direction,
	color,
}: CardScrollerProps<T>) => {
	const [start, setStart] = useState(0);
	const [length, setLength] = useState(1);

	const scrollRef = useRef<HTMLDivElement>(null);

	// useEffect(() => {
	// 	const autoscroller = new AutoScroller(
	// 		scrollRef,
	// 		direction * (1 + Math.random()),
	// 		setStart,
	// 	);
	// 	autoscroller.start();

	// 	setLength(
	// 		Math.floor((scrollRef?.current?.scrollWidth ?? 0) / (13.5 * 16)) + 3,
	// 	);
	// 	window.addEventListener("resize", () =>
	// 		setLength(
	// 			Math.floor((scrollRef?.current?.scrollWidth ?? 0) / (13.5 * 16)) + 3,
	// 		),
	// 	);

	// 	return () => autoscroller.close();
	// }, [direction]);

	return (
		<>
			<Box
				ref={scrollRef}
				component="section"
				className="disable-scrollbar"
				w="100%"
				style={{ overflowX: "scroll" }}
			>
				<Box
					style={{
						display: "inline-flex",
						flexDirection: "row",
					}}
				>
					{data.map((_, i) => {
						const datum = data[(start + i) % data.length];
						return (
							<Tooltip
								key={
									idKey === "game"
										? getGameName(datum[idKey] as string)
										: datum[idKey]
								}
								label={datum[tooltipKey]}
								position="bottom"
							>
								<Box m="0.25rem" w="13rem" h="13rem">
									<CardLink
										href={`/${route}/${datum[idKey]}`}
										img={`/images/${route}/${idKey === "game" ? getGameImage(datum[idKey] as string) : datum[idKey] + ".svg"}`}
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
					style={{ position: "relative", zIndex: 1, cursor: "pointer" }}
				>
					{"See all →"}
				</Title>
			</Link>
		</>
	);
};

export default CardScroller;
