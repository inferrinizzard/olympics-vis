import { Spoiler, Text } from "@mantine/core";

import { getWikipediaExcerpt } from "lib/utils/wikipedia";

interface WikipediaExcerptProps {
	pageName: string;
	height?: number;
}

const WikipediaExcerpt = async ({
	pageName,
	height,
}: WikipediaExcerptProps) => {
	if (!pageName) {
		return "[No Wikipedia Excerpt available]";
	}

	const excerptText = await getWikipediaExcerpt(pageName);

	return (
		<Spoiler
			maxHeight={height ?? 250}
			showLabel="Keep Reading"
			hideLabel="Hide"
		>
			<Text style={{ color: "white" }}>{excerptText}</Text>
		</Spoiler>
	);
};

export default WikipediaExcerpt;
