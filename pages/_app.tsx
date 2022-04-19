import type { AppProps } from 'next/app';

import 'styles/globals.css';

function OlympicsVis({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export default OlympicsVis;
