import { Box, Paper, Text, Title } from '@mantine/core';

export interface StatCardProps {
	Icon: React.ComponentType<any>; // TODO: type for CSSProperties
	title: string;
	text: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ Icon, title, text }) => {
	return (
		<Paper p="sm" sx={{ minWidth: '15rem' }}>
			<Box sx={{ display: 'flex', columnGap: '0.5rem' }}>
				<Box sx={{ display: 'flex', alignContent: 'center' }}>
					<Icon style={{ height: '3rem', width: '100%' }} />
				</Box>
				<Box>
					<Title order={5}>{title}</Title>
					<Text>{text || 'lorem ipsum'}</Text>
				</Box>
			</Box>
		</Paper>
	);
};

export default StatCard;
