import { CSSProperties } from 'react';
import { Box, Grid, type ColProps } from '@mantine/core';

const GridCell: React.FC<ColProps & { boxStyle?: CSSProperties }> = ({
	children,
	boxStyle,
	...props
}) => {
	return (
		<>
			<Grid.Col {...props}>
				<Box
					p="md"
					sx={theme => ({
						...boxStyle,
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
