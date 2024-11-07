import { Spoiler, Text } from "@mantine/core";

interface ExcerptProps {
	text: string;
	height?: number;
}

const Excerpt: React.FC<ExcerptProps> = ({ text, height }) => {
	return (
		<Spoiler
			maxHeight={height ?? 250}
			showLabel="Keep Reading"
			hideLabel="Hide"
		>
			<Text style={{ color: "white" }}>{text}</Text>
		</Spoiler>
	);
};

export default Excerpt;
