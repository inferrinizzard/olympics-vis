import type { PageProps as NextPageProps } from ".next/types/app/layout";

export interface PageProps extends NextPageProps {
	searchParams: Record<string, string | string[] | undefined>;
}
