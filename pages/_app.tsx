import { useState } from 'react';
import type { AppProps } from 'next/app';

import {
	AppShell,
	ColorSchemeProvider,
	MantineProvider,
	type ColorScheme,
	type Tuple,
} from '@mantine/core';

import Header from 'components/layouts/Header';

import '../styles/globals.css';
import { colours } from 'src/constants/colours';

const OlympicsVis = ({
	Component,
	pageProps,
	...props
}: AppProps & { colorScheme: ColorScheme }) => {
	const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

	const toggleColorScheme = (value?: ColorScheme) => {
		const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
		setColorScheme(nextColorScheme);
		// setCookies('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
	};

	return (
		<>
			<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
				<MantineProvider
					theme={{
						colorScheme,
						colors: colours as Record<keyof typeof colours, Tuple<string, 10>>,
						primaryShade: 6,
					}}
					withGlobalStyles
					withNormalizeCSS>
					<AppShell
						padding="md"
						header={<Header />}
						styles={theme => ({
							main: {
								backgroundColor:
									theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
								minHeight: '95vh',
							},
						})}>
						<Component {...pageProps} />
					</AppShell>
				</MantineProvider>
			</ColorSchemeProvider>
		</>
	);
};

export default OlympicsVis;
