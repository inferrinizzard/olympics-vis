import { Skeleton } from '@mantine/core';

interface TextLoaderProps {
	lines?: number;
	width?: string;
}

const TextLoader: React.FC<TextLoaderProps> = ({ lines = 4, width = '100px' }) => {
	return (
		<>
			{new Array(lines - 1).fill(0).map((_, i) => (
				<Skeleton height="1rem" key={'Skeleton ' + i} width={width} mb="0.5rem" />
			))}
			<Skeleton height="1rem" width={`calc(${width} * 0.7)`} />
		</>
	);
};

export default TextLoader;
