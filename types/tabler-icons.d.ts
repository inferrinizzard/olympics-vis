/// <reference types='tabler-icons-react' />

// copied from tabler-icons-react
interface IconProps extends SVGAttributes<SVGElement> {
	color?: string;
	size?: string | number;
}

type Icon = FC<IconProps>;

declare module 'tabler-icons-react/dist/icons/*' {
	const Component: Icon;
	export default Component;
}
