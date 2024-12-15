import type { Dispatch, ReactNode, SetStateAction } from "react";

import { Modal } from "@mantine/core";

interface DisplayModalProps {
	isModalOpen: boolean;
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
	content: ReactNode;
}

const DisplayModal = ({
	isModalOpen,
	setIsModalOpen,
	content,
}: DisplayModalProps) => {
	return (
		<Modal
			opened={isModalOpen}
			onClose={() => setIsModalOpen(false)}
			withCloseButton={false}
			size="auto"
		>
			{content}
		</Modal>
	);
};

export default DisplayModal;
