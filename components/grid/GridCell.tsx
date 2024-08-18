import type { PropsWithChildren } from "react";
import { Paper, type BoxProps } from "@mantine/core";

interface GridCellProps extends BoxProps {}

const GridCell = ({ children, ...props }: PropsWithChildren<GridCellProps>) => {
	return (
		<Paper
			p="sm"
			shadow="md"
			// sx={theme => ({
			// 	accentColor: 'white',
			// 	borderRadius: '1rem',
			// 	...(sx instanceof Function ? sx(theme) : sx),
			// })}
			{...props}
		>
			{children}
		</Paper>
	);
};

export default GridCell;
