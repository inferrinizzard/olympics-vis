import { Paper, type BoxProps, type Sx } from '@mantine/core';

interface GridCellProps extends BoxProps {
	sx?: Sx;
}

const GridCell: React.FC<GridCellProps> = ({ children, sx, ...props }) => {
	return (
		<Paper
			p="sm"
			shadow="md"
			sx={theme => ({
				accentColor: 'white',
				borderRadius: '1rem',
				...(sx instanceof Function ? sx(theme) : sx),
			})}
			{...props}>
			{children}
		</Paper>
	);
};

export default GridCell;
