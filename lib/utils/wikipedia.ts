import wiki from "wikipedia";

export const getWikipediaExcerpt = async (pageName?: string | null) =>
	pageName
		? await wiki
				.page(pageName, {
					preload: true,
					fields: ["intro"],
				})
				.then((page) => page._intro)
		: "[No Wikipedia excerpt available]";
