import { Anchor, Breadcrumbs, Header as MantineHeader } from '@mantine/core';
import { useRouter } from 'next/router';

const Header = () => {
	const router = useRouter();
	const path = router.asPath;

	const pathBreadCrumbs = path
		.split('/')
		.slice(1)
		.reduce(
			(acc, slug) => ({
				crumbs: [...acc.crumbs, { title: slug, href: acc.path + '/' + slug }],
				path: acc.path + '/' + slug,
			}),
			{ crumbs: [] as { title: string; href: string }[], path: '' }
		).crumbs;

	return (
		<MantineHeader height={60} p="xs">
			<Breadcrumbs>
				{pathBreadCrumbs.map(({ title, href }) => (
					<Anchor key={href} href={href}>
						{title}
					</Anchor>
				))}
			</Breadcrumbs>
		</MantineHeader>
	);
};

export default Header;
