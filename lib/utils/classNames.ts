export const classNames = (
	...args: (string | Record<string, boolean | undefined | null> | string[])[]
): string => {
	const classes = [];

	for (const arg of args) {
		if (typeof arg === "string") {
			classes.push(arg);
		} else if (Array.isArray(arg)) {
			classes.push(...arg);
		} else if (typeof arg === "object") {
			for (const [key, value] of Object.entries(arg)) {
				if (value) {
					classes.push(key);
				}
			}
		}
	}

	return classes
		.filter((c) => !!c)
		.join(" ")
		.trim();
};
