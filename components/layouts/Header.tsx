import { useRouter } from 'next/router';

import { NextLink } from '@mantine/next';
import { Breadcrumbs, Header as MantineHeader } from '@mantine/core';

import { Home } from 'tabler-icons-react';

const Header = () => {
	const router = useRouter();
	const path = router.asPath;

	const pathBreadCrumbs = [...path.matchAll(/[/][^/]+/g)]
		.flatMap(crumb => crumb)
		.reduce(
			(acc, slug) => ({
				crumbs: [...acc.crumbs, { title: slug, href: acc.path + slug }],
				path: acc.path + slug,
			}),
			{ crumbs: [] as { title: string; href: string }[], path: '' }
		).crumbs;

	return (
		<MantineHeader height={60} p="xs">
			<Breadcrumbs>
				<NextLink href="/">
					<Home style={{ cursor: 'pointer' }} />
				</NextLink>
				{pathBreadCrumbs.map(({ title, href }) => (
					<NextLink key={href} href={href}>
						{title.replace(/^[/]/, '')}
					</NextLink>
				))}
			</Breadcrumbs>
		</MantineHeader>
	);
};

export default Header;
