import { useRouter } from 'next/router';

import { NextLink } from '@mantine/next';
import {
	Box,
	Breadcrumbs,
	Group,
	Header as MantineHeader,
	Image,
	TextInput,
	type HeaderProps,
} from '@mantine/core';

import { Home, Search } from 'tabler-icons-react';

import ColorSchemeToggle from 'components/controls/ColorSchemeToggle';

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

	const showSearch = path.length > 1 && path.split('/').length === 2;

	return (
		<MantineHeader
			{...props}
			height={48}
			// 48px = 3rem
			p="xs"
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				height: 'fit-content',
				maxHeight: 'fit-content',
			}}>
			<Group>
				<NextLink href="/">
					<Box h="2.5rem" w="2.5rem" bg="white" sx={{ borderRadius: '0.5rem', overflow: 'hidden' }}>
						<Image
							src={'https://upload.wikimedia.org/wikipedia/commons/a/a7/Olympic_flag.svg'}
							alt="Home"
							height={'2.5rem'}
							fit="scale-down"
						/>
					</Box>
				</NextLink>
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
			</Group>

			<Group>
				{showSearch && (
					<TextInput variant="filled" placeholder="Search" icon={<Search />} radius="md" />
				)}
				<ColorSchemeToggle />
			</Group>
		</MantineHeader>
	);
};

export default Header;
