export const getGameName = (gamesId: string) => {
	const slugs = gamesId.split('-');
	if (/^\d{4}/.test(gamesId)) {
		let [year, season] = slugs;
		season = season[0].toUpperCase() + season.slice(1);
		return `${season} ${year}`;
	}
	const year = slugs.pop();
	const city = slugs.map(slug => slug[0].toUpperCase() + slug.slice(1)).join(' ');

	return `${city} ${year}`;
};
