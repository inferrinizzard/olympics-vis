"use server";

import { Box, Container, Stack, Title } from "@mantine/core";

import { Image, type ImageProps } from "components/util/Image";

import * as classes from "./IconGrid.css";

export interface IconGridProps {
	list: string[];
	buildImageProps: (code: string) => Omit<ImageProps, "code">;
}

const IconGrid = ({ list, buildImageProps }: IconGridProps) => {
	return (
		<Container className={classes.SportsIconGrid}>
			{list.slice(0, 8).map((code) => (
				<Stack key={code} gap="xs" align="stretch">
					<Box pos="relative" maw="10rem" style={{ aspectRatio: "1 / 1" }}>
						<Image {...buildImageProps(code)} code={code} fill />
					</Box>
					<Title order={5} component="p" style={{ textAlign: "center" }}>
						{code}
					</Title>
				</Stack>
			))}
			{list.length > 8 && (
				<Stack justify="center">
					<Title order={5} component="p" style={{ textAlign: "center" }}>
						{"See All"}
					</Title>
				</Stack>
			)}
		</Container>
	);
};

export default IconGrid;
