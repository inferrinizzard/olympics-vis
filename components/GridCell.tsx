import { Box, Grid, type ColProps } from '@mantine/core';

const GridCell: React.FC<ColProps> = ({ children, ...props }) => {
	return (
		<>
			<Grid.Col {...props}>
				<Box
					p="md"
					sx={theme => ({
						backgroundColor: theme.colors.blue[4],
						borderRadius: '1rem',
						height: '100%',
					})}>
					{children}
				</Box>
			</Grid.Col>
		</>
	);
};

export default GridCell;
