import { useRouter } from 'next/router';

import { NextLink } from '@mantine/next';
import { Button, Tooltip } from '@mantine/core';

import { ArrowBack } from 'tabler-icons-react';

const BackButton = () => {
	const router = useRouter();

	const path = router.asPath;
	const parentPath = path.replace(/[/][^/]*$/, ''); // trim trailing /:slug

	return (
		<div style={{ position: 'fixed', right: '2rem', bottom: '2rem' }}>
			<Tooltip label={'Return to Parent Page'}>
				<NextLink href={parentPath}>
					<Button radius="xl">
						<ArrowBack />
					</Button>
				</NextLink>
			</Tooltip>
		</div>
	);
};

export default BackButton;
