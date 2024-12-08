export const getGameName = (gamesId: string) => {
	if (!gamesId) {
		return "";
	}

	const slugs = gamesId.split("_").map(
		(slug) =>
			slug
				.replace(/youth/i, "Youth Olympics")
				.replaceAll(/(^[a-z]|\W[a-z])/g, (matchedChar) =>
					matchedChar.toUpperCase(),
				)
				.replaceAll(/-/g, " ")
				.replaceAll(/=/g, ", ")
				.replaceAll(/[+]/g, "-")
				.replaceAll(/st /gi, (st) => `${st}. `) // st. moritz, st. louis
				.replaceAll(/d /gi, (d) => `${d}'`) // cortina d'ampezzo
				.replaceAll(/de /gi, (de) => de.toLowerCase()) // Rio de Janeiro
				.replaceAll(/tbd/gi, (tbd) => tbd.toUpperCase()), // TBD
	);

	return slugs.join(" ");
};
