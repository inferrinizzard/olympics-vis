import axios from 'axios';

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

export const getWikipediaUrl = (country: string) =>
	`https://en.wikipedia.org/w/api.php?action=parse&format=json&page=${country.replace(
		/\s+/g,
		'_'
	)}_at_the_Olympics&prop=wikitext&wrapoutputclass=mw-parser-output&section=0&disablelimitreport=1&disableeditsection=1&disabletoc=1&utf8=1&formatversion=2`;

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
