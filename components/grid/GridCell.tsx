import { Paper, type PaperProps, type Sx } from '@mantine/core';

interface GridCellProps {
	colour: string;
}

const GridCell: React.FC<GridCellProps & PaperProps> = ({ children, colour, sx, ...props }) => {
	return (
		<Paper
			p="sm"
			sx={theme => ({
				...(sx as Sx),
				accentColor: 'white',
				backgroundColor: theme.colors[colour][5],
				borderRadius: '1rem',
			})}
			{...props}>
			{children}
		</Paper>
	);
};

export default GridCell;
