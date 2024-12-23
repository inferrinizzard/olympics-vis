"use client";

import { Button, ButtonGroup, Group, Title } from "@mantine/core";

import { HEADER_HEIGHT } from "components/shell/Header";

export interface SectionLinksProps {
	ids: string[];
}

const SectionLinks = ({ ids }: SectionLinksProps) => {
	return (
		<Group
			justify="center"
			// pos="sticky"
			top={HEADER_HEIGHT}
			p="xs"
			bg="white"
			h="md"
		>
			<Title component="p" order={3}>
				{"Jump to:"}
			</Title>
			<ButtonGroup>
				{ids.map((id) => (
					<Button key={`#${id}`} color="gray" autoContrast>
						<Title
							component="p"
							order={5}
							onClick={() => {
								const target = document.getElementById(id);
								if (!target) {
									return;
								}

								target.style.scrollMarginTop = HEADER_HEIGHT;
								target.scrollIntoView({ behavior: "smooth" });
								target.style.scrollMarginTop = "";
							}}
							style={{ cursor: "pointer" }}
						>
							{id}
						</Title>
					</Button>
				))}
			</ButtonGroup>
		</Group>
	);
};

export default SectionLinks;
