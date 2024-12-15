"use server";

import { Box, Container, Stack, Title } from "@mantine/core";

import { Image, type ImageProps } from "components/util/Image";

import * as classes from "./IconGrid.css";

export interface IconGridProps {
	list: { code: string; label?: string }[];
	limit?: number;
	buildImageProps: (code: string) => Omit<ImageProps, "code">;
}

const IconGrid = ({ list, limit = -1, buildImageProps }: IconGridProps) => {
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
			{list.length > limit && (
				<Stack className={classes.IconGridItem}>
					<Title order={5} component="p" style={{ textAlign: "center" }}>
						{"See All"}
					</Title>
				</Stack>
			)}
		</Container>
	);
};

export default IconGrid;
