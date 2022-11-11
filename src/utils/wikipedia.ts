import axios from 'axios';

const pageMap = {
	countries: (country: string) => `${country.replace(/\s+/g, '_')}_at_the_Olympics`,
	sports: (sport: string) => `${sport.replace(/\s+/g, '_')}_at_the_Olympics`,
	games: (games: string) => `${games.replace(/\s+/g, '_')}_Olympics`,
};

export const getWikipediaUrl = (pageType: keyof typeof pageMap, page: string) =>
	`https://en.wikipedia.org/w/api.php?action=parse&format=json&page=${pageMap[pageType](
		page
	)}&prop=wikitext&wrapoutputclass=mw-parser-output&section=0&disablelimitreport=1&disableeditsection=1&disabletoc=1&utf8=1&formatversion=2`;

export const getWikipediaExcerpt = async (url: string) => {
	return axios
		.get(url)
		.then(
			({
				data: {
					parse: { wikitext },
				},
			}) => {
				const trimPreLinks = wikitext.replace(/^(?:\s*\{\{.+?\}\}\s*)+/, '');
				const trimInfobox = trimPreLinks.replace(/^(\s*[|{&(](.|\n)+?\}\}\s*)+/, '');
				const trimHyperlinks = trimInfobox.replace(/<.+>.+?<\/.+>/g, '');
				const trimTripleQuotes = trimHyperlinks.replace(/'''(.+?)'''/g, '$1');
				const trimDoubleBrace = trimTripleQuotes.replace(/\{\{.+?\}\}/g, '');
				const trimDoubleBracket = trimDoubleBrace.replace(/\[\[([^|]+?)\]\]/g, '$1');
				const trimRenamedDoubleBracket = trimDoubleBracket.replace(/\[\[.+?\|(.+?)\]\]/g, '$1');

				return trimRenamedDoubleBracket + ' [Wikipedia]';
			}
		)
		.catch(() => 'Unable to fetch excerpt.');
};
