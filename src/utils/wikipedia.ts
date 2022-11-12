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
				// const trimPreLinks = wikitext.replace(/^(?:\s*\{\{.+?\}\}\s*)+/, '');
				// console.log('trimPreLinks', trimPreLinks);

				const trimInfobox = wikitext.replace(/^(\s*[^\w](.|\n)+?\}\}\s*)+/, '');
				const trimHyperlinks = trimInfobox.replace(/<ref[^>]*>[^<]*<\/ref>|<ref.+?\/>/g, '');
				const trimTripleQuotes = trimHyperlinks.replace(/'''(.+?)'''/g, '$1');

				// targets {nihongo|ENGLISH|KANJI|ROMAJI|etc}
				const trimSpecialDoubleBrace = trimTripleQuotes.replace(
					/\{\{\w+\|(?:\w+=)?(.+?)\|(?:\w+=)?(.+?)(?:\|(?:\w+=)?(.+?)(?:\|.+?)?)?\}\}/g,
					(_match: RegExpMatchArray, ...groups: string[]) =>
						groups[2]
							? `${groups[0]} (${groups[1]}, ${groups[2]})`
							: groups[1]
							? `${groups[0]}, ${groups[1]}`
							: groups[0]
				);
				const trimDoubleBrace = trimSpecialDoubleBrace.replace(/\{\{.+?\}\}/g, '');
				const trimDoubleBracket = trimDoubleBrace.replace(/\[\[([^|]+?)\]\]/g, '$1');
				const trimRenamedDoubleBracket = trimDoubleBracket.replace(/\[\[.+?\|(.+?)\]\]/g, '$1');
				const replaceNonBreakingSpace = trimRenamedDoubleBracket.replace(/&nbsp;/g, '\u00A0');

				const final = replaceNonBreakingSpace;

				// const firstTwoParagraphs = final.split('\n').slice(0, 3).join('\n');

				return final + ' [Wikipedia]';
			}
		)
		.catch(() => 'Unable to fetch excerpt.');
};
