import { useState } from 'react';
import type { AppProps } from 'next/app';
import { AppShell, ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';

import '../styles/globals.css';
import Header from 'components/layouts/Header';

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
				<MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
					<AppShell
						padding="md"
						// navbar={<Navbar width={{ base: 300 }} height={500} p="xs">{/* Navbar content */}</Navbar>}
						header={<Header />}
						styles={theme => ({
							main: {
								backgroundColor:
									theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
								height: '95vh',
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
