"use client";

import { type ReactNode, useState } from "react";

import { Button, Title } from "@mantine/core";

import GamesSportsModal from "./DisplayModal";

interface GamesSportsModalButtonProps {
	label: string;
	content: ReactNode;
}

const GamesSportsModalButton = ({
	content,
	label,
}: GamesSportsModalButtonProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setIsModalOpen(true)}>
				<Title order={5} component="p" style={{ textAlign: "center" }}>
					{label}
				</Title>
			</Button>
			<GamesSportsModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				content={content}
			/>
		</>
	);
};

export default GamesSportsModalButton;
