import { useState } from 'react';
import type { AppProps } from 'next/app';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';

import '../styles/globals.css';

function OlympicsVis({ Component, pageProps, ...props }: AppProps & { colorScheme: ColorScheme }) {
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
					<Component {...pageProps} />
				</MantineProvider>
			</ColorSchemeProvider>
		</>
	);
}

export default OlympicsVis;
