import { useState } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { AppShell, ColorSchemeProvider, MantineProvider, type ColorScheme } from '@mantine/core';

import Header from 'components/layouts/Header';

import '../styles/globals.css';
import { colours as colors, accentColourMapping } from 'src/constants/colours';

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

	const { route } = useRouter();
	const colourKey = route.split('/')[1];

	return (
		<>
			<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
				<MantineProvider
					theme={{ colorScheme, colors, primaryShade: 1 }}
					withGlobalStyles
					withNormalizeCSS>
					<AppShell
						padding="md"
						header={
							<Header
								sx={theme => ({
									backgroundColor: theme.colors[accentColourMapping[colourKey]][1],
								})}
							/>
						}
						styles={theme => ({
							main: {
								backgroundColor:
									theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2],
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
