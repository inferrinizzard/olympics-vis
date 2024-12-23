"use client";

import { useRef, useState } from "react";
import Link from "next/link";

import { Box, Title, Tooltip } from "@mantine/core";

import CardLink from "components/layouts/main-page/CardLink";
import AutoScroller from "lib/utils/Autoscroller";
import { getGameName } from "lib/utils/getGameName";

interface CardScrollerProps<T> {
	data: T[];
	route: string;
	tooltipKey: string;
	direction: 1 | -1;
	color: string;
}

const CardScroller = <T extends Record<string, string | number | null>>({
	data,
	route,
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
								key={datum.code}
								label={datum[tooltipKey]}
								position="bottom"
							>
								<Box m="0.25rem" w="13rem" h="13rem">
									<CardLink
										href={`/${route}/${datum.code}`}
										imageProps={{
											dir:
												route === "countries"
													? "country"
													: (route as "games" | "sports"),
											code: (datum.code ?? "").toString(),
											alt: datum.code as string,
										}}
										hoverColour={color}
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
