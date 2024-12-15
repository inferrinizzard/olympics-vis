import type { Dispatch, ReactNode, SetStateAction } from "react";

import { Modal } from "@mantine/core";

interface GamesSportsModalProps {
	isGamesSportsModalOpen: boolean;
	setIsGamesSportsModalOpen: Dispatch<SetStateAction<boolean>>;
	iconGrid: ReactNode;
}

const GamesSportsModal = ({
	isGamesSportsModalOpen,
	setIsGamesSportsModalOpen,
	iconGrid,
}: GamesSportsModalProps) => {
	return (
		<Modal
			opened={isGamesSportsModalOpen}
			onClose={() => setIsGamesSportsModalOpen(false)}
			withCloseButton
		>
			{iconGrid}
		</Modal>
	);
};

export default GamesSportsModal;
