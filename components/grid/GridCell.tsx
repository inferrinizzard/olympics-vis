import { Paper, type PaperProps, type Sx } from '@mantine/core';

interface GridCellProps extends PaperProps {
	colour: string;
	sx?: Sx;
}

const GridCell: React.FC<GridCellProps> = ({ children, colour, sx, ...props }) => {
	return (
		<Paper
			p="sm"
			shadow="md"
			sx={theme => ({
				accentColor: 'white',
				borderRadius: '1rem',
				backgroundColor: colour in theme.colors ? theme.colors[colour][5] : colour,
				...(sx instanceof Function ? sx(theme) : sx),
			})}
			{...props}>
			{children}
		</Paper>
	);
};

export default GridCell;
