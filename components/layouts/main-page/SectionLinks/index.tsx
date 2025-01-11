"use server";

import Link from "next/link";

import { Button, Group, Stack, Title, Text } from "@mantine/core";

import { HEADER_HEIGHT } from "components/shell/Header";

export interface SectionLinksProps {
	ids: string[];
}

const SectionLinks = ({ ids }: SectionLinksProps) => {
	return (
		<Stack
			justify="center"
			pos="sticky"
			top={HEADER_HEIGHT}
			p="xs"
			bg="white"
			style={{ zIndex: 1 }}
			gap="xs"
		>
			<Title component="p" order={4}>
				{"Jump to:"}
			</Title>

			<Group gap="xs">
				{ids.map((id) => (
					<Link key={`#${id}`} href={`#${id}`}>
						<Button color="gray" autoContrast size="xs">
							<Text style={{ cursor: "pointer" }}>{id}</Text>
						</Button>
					</Link>
				))}
			</Group>
		</Stack>
	);
};

export default SectionLinks;
