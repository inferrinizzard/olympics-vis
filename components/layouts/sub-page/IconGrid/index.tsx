"use server";

import type { ReactNode } from "react";

import { Box, Container, Stack, Title } from "@mantine/core";

import { Image, type ImageProps } from "components/util/Image";

import * as classes from "./IconGrid.css";

export interface IconGridProps {
	list: { code: string; label?: string }[];
	limit?: number;
	endItem?: ReactNode;
	buildImageProps: (code: string) => Omit<ImageProps, "code">;
}

const IconGrid = ({
	list,
	limit: _limit = -1,
	endItem,
	buildImageProps,
}: IconGridProps) => {
	const limit = endItem ? _limit - 1 : _limit;

	return (
		<Container className={classes.IconGrid}>
			{list.slice(0, limit).map(({ code, label }) => (
				<Stack key={code} gap="xs" className={classes.IconGridItem}>
					<Box className={classes.IconGridItemImageWrapper}>
						<Image {...buildImageProps(code)} code={code} fill />
					</Box>
					<Title order={5} component="p" style={{ textAlign: "center" }}>
						{label ?? code}
					</Title>
				</Stack>
			))}
			{list.length > limit && endItem && (
				<Stack className={classes.IconGridItem}>{endItem}</Stack>
			)}
		</Container>
	);
};

export default IconGrid;
