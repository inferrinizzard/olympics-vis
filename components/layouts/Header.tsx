import { useRouter } from 'next/router';

import { NextLink } from '@mantine/next';
import { Breadcrumbs, Header as MantineHeader, type HeaderProps } from '@mantine/core';

import { Home } from 'tabler-icons-react';

const Header: React.FC<Partial<HeaderProps>> = props => {
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
		<MantineHeader {...props} height={48} p="xs">
			{/* 48px = 3rem */}
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
