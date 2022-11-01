import { Paper, type ButtonProps, type PaperProps, type Sx } from '@mantine/core';

interface GridCellProps {
	colour: string;
}

const GridCell: React.FC<GridCellProps & PaperProps & Pick<ButtonProps, 'variant'>> = ({
	children,
	variant = 'filled',
	colour,
	sx,
	...props
}) => {
	return (
		<Paper
			p="sm"
			sx={theme => ({
				accentColor: 'white',
				borderRadius: '1rem',
				...(variant === 'outline'
					? {
							border: '0.25rem solid',
							borderColor: theme.colors[colour][5],
					  }
					: {
							backgroundColor: colour in theme.colors ? theme.colors[colour][5] : colour,
					  }),
				...(sx as Sx),
			})}
			{...props}>
			{children}
		</Paper>
	);
};

export default GridCell;
