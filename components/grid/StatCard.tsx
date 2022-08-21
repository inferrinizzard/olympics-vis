import { Paper, Text } from '@mantine/core';

export interface StatCardProps {
	icon: React.ReactElement;
	title: string;
	text: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, text }) => {
	return (
		<Paper
			shadow="sm"
			p="sm"
			sx={{
				maxHeight: '100%',
				aspectRatio: '1 / 1',
			}}>
			{icon}
			<Text>{title}</Text>
			<Text>{text}</Text>
		</Paper>
	);
};

export default StatCard;
