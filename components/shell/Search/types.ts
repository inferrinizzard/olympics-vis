import type { PathKey } from "types/prisma";

import type searchStringEntries from "./searchStrings.json";

export type SearchResult = (typeof searchStringEntries)[number] & {
	path: PathKey;
};
