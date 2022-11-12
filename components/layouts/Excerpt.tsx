import { Spoiler, Text } from '@mantine/core';

import TextLoader from './TextLoader';

interface ExcerptProps {
	text: string;
	height?: number;
}

const Excerpt: React.FC<ExcerptProps> = ({ text, height }) => {
	return text ? (
		<Spoiler maxHeight={height ?? 250} showLabel="Keep Reading" hideLabel="Hide">
			<Text sx={{ color: 'white' }}>{text}</Text>
		</Spoiler>
	) : (
		<TextLoader width="100%" />
	);
};

export default Excerpt;
