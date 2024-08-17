import { useRouter } from "next/router";
import { accentColourMapping, colours } from "styles/colours";

const useAccentColour = () => {
	const { route } = useRouter();
	const colourKey = route.split("/")[1];

	const colourTheme =
		colourKey in accentColourMapping
			? colours[accentColourMapping[colourKey] as keyof typeof colours]
			: new Array(3).fill("#fff");

	return {
		light: colourTheme[0],
		primary: colourTheme[1],
		dark: colourTheme[2],
	};
};

export default useAccentColour;
