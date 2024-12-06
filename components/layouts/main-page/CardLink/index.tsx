import type { CSSProperties } from "react";

import Link from "next/link";

import { Card, CardSection, Stack, Title } from "@mantine/core";

import { Image, type ImageProps } from "components/util/Image";

import * as classes from "./CardLink.css";
import { classNames } from "lib/utils/classNames";

export interface CardLinkProps {
	href: string;
	caption?: string;
	secondary?: string;
	hoverColour?: string;

	aspectRatio?: CSSProperties["aspectRatio"];
	imageProps: ImageProps & { style?: CSSProperties };
}

const CardLink = ({
	href,
	caption,
	secondary,
	hoverColour,
	aspectRatio = "1 / 1",
	imageProps,
}: CardLinkProps) => {
	return (
		<Link passHref href={href} className={classes.CardLinkLink}>
			<Card className={classes.CardLinkCard} withBorder>
				<CardSection
					className={classNames(
						"next-img-wrapper",
						classes.CardLinkImageWrapper,
					)}
					style={{ aspectRatio }}
				>
					<Image
						{...imageProps}
						fill
						style={{ ...imageProps.style, objectFit: "contain" }}
					/>
				</CardSection>

				{(caption || secondary) && (
					<Stack flex="1" justify="center" gap="xs">
						{caption && (
							<Title order={3} style={{ textAlign: "center" }}>
								{caption}
							</Title>
						)}
						{secondary && (
							<Title order={5} style={{ textAlign: "center" }}>
								{secondary}
							</Title>
						)}
					</Stack>
				)}
			</Card>
		</Link>
	);
};

export default CardLink;
