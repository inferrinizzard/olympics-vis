import { Html, Head, Main, NextScript } from 'next/document';

interface DocumentProps {}

const Document: React.FC<DocumentProps> = () => {
	return (
		<Html lang="en">
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					// crossorigin
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Work+Sans&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;
