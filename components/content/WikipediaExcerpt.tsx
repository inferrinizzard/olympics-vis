import { Spoiler, Text } from "@mantine/core";

import Link from "next/link";

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

	const rawExcerptText = await getWikipediaExcerpt(pageName);

	const excerptText =
		rawExcerptText.length <= 1000
			? `${rawExcerptText} `
			: `${rawExcerptText.slice(0, 1000)}…`;

	return (
		<Spoiler
			maxHeight={height ?? 250}
			showLabel="Keep Reading"
			hideLabel="Hide"
		>
			<Text style={{ color: "white" }}>
				{excerptText}
				{"["}
				<Link
					href={`https://en.wikipedia.org/wiki/${pageName}`}
					style={{ color: "white" }}
				>
					{"Wikipedia"}
				</Link>
				{"]"}
			</Text>
		</Spoiler>
	);
};

export default WikipediaExcerpt;
