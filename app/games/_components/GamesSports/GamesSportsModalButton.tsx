"use client";

import { type ReactNode, useState } from "react";

import { Button, Title } from "@mantine/core";

import GamesSportsModal from "./GamesSportsModal";

interface GamesSportsModalButtonProps {
	iconGrid: ReactNode;
}

const GamesSportsModalButton = ({ iconGrid }: GamesSportsModalButtonProps) => {
	const [isGamesSportsModalOpen, setIsGamesSportsModalOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setIsGamesSportsModalOpen(true)}>
				<Title order={5} component="p" style={{ textAlign: "center" }}>
					{"See All"}
				</Title>
			</Button>
			<GamesSportsModal
				isGamesSportsModalOpen={isGamesSportsModalOpen}
				setIsGamesSportsModalOpen={setIsGamesSportsModalOpen}
				iconGrid={iconGrid}
			/>
		</>
	);
};

export default GamesSportsModalButton;
