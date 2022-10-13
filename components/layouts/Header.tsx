import { useRouter } from 'next/router';

import { NextLink } from '@mantine/next';
import { Breadcrumbs, Header as MantineHeader, TextInput } from '@mantine/core';

import { Home, Search } from 'tabler-icons-react';

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
		<MantineHeader height="5vh" p="xs" sx={{ display: 'flex', justifyContent: 'space-between' }}>
			<span>
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
			</span>

				<TextInput variant="filled" placeholder="Search" icon={<Search />} radius="md" />
		</MantineHeader>
	);
};

export default Header;
