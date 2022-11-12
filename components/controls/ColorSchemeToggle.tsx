import { ActionIcon, Group, useMantineColorScheme } from '@mantine/core';

import { Moon, Sun } from 'tabler-icons-react';

const ColorSchemeToggle = () => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();

	return (
		<ActionIcon
			size="lg"
			variant="filled"
			sx={theme => ({
				backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
				color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
			})}
			onClick={() => toggleColorScheme()}>
			{colorScheme === 'dark' ? <Sun width={20} height={20} /> : <Moon width={20} height={20} />}
		</ActionIcon>
	);
};

export default ColorSchemeToggle;
