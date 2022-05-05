import { Paper, Text } from '@mantine/core';

export interface StatCardProps {
	icon: React.ReactElement;
	title: string;
	text: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, text }) => {
	return (
		<Paper shadow="sm" p="sm" m="xs" sx={{ display: 'inline-block', width: 'fit-content' }}>
			{icon}
			<Text>{title}</Text>
			<Text>{text}</Text>
		</Paper>
	);
};

export default StatCard;
