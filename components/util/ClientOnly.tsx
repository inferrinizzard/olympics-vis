import {
	type ReactNode,
	useEffect,
	useState,
	type PropsWithChildren,
} from "react";

// https://www.joshwcomeau.com/react/the-perils-of-rehydration/

interface ClientOnlyProps {
	placeholder?: ReactNode;
}

export const ClientOnly = ({
	children,
	placeholder,
}: PropsWithChildren<ClientOnlyProps>) => {
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	if (!hasMounted) {
		return placeholder;
	}

	return children;
};
