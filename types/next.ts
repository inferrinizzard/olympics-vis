export interface PageProps {
	searchParams: Record<string, string | string[] | undefined>;
}

export interface MetadataProps<Params extends Record<string, string>> {
	params: Promise<Params>;
	searchParams: Promise<PageProps["searchParams"]>;
}
