import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import Sun from "tabler-icons-react/dist/icons/sun";
import Moon from "tabler-icons-react/dist/icons/moon";

import { vars } from "styles/theme";

const ColorSchemeToggle = () => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();

	return (
		<ActionIcon
			size="lg"
			variant="filled"
			bg={vars.colors.primary}
			onClick={() => toggleColorScheme()}
		>
			{colorScheme === "dark" ? (
				<Sun width="1.25rem" height="1.25rem" />
			) : (
				<Moon width="1.25rem" height="1.25rem" />
			)}
		</ActionIcon>
	);
};

export default ColorSchemeToggle;
