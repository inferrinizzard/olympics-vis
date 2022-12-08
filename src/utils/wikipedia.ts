import axios from 'axios';

const pageMap = {
	countries: (country: string) => `${country.replace(/\s+/g, '_')}_at_the_Olympics`,
	sports: (sport: string) => `${sport.replace(/\s+/g, '_')}_at_the_Olympics`,
	games: (games: string) => `${games.replace(/\s+/g, '_')}_Olympics`,
};

export const getWikipediaUrl = (pageType: keyof typeof pageMap, page: string) =>
	'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=$PAGE&redirects=1&formatversion=2&exintro=1&explaintext=1'.replace(
		'$PAGE',
		pageMap[pageType](page)
	);

export const getWikipediaExcerpt = async (url: string) => {
	return axios
		.get(url)
		.then(
			({
				data: {
					query: {
						pages: [page],
					},
				},
			}) => page.extract
		)
		.catch(() => 'Unable to fetch excerpt.');
};
