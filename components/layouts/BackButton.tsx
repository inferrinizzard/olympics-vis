import { useRouter } from 'next/router';

import { ActionIcon, Tooltip } from '@mantine/core';

import { ArrowBack } from 'tabler-icons-react';

import useAccentColour from 'src/hooks/useAccentColour';

const BackButton = () => {
	const router = useRouter();
	const { primary } = useAccentColour();

	const path = router.asPath;
	const parentPath = path.replace(/[/][^/]*$/, ''); // trim trailing /:slug

	// TODO: use Link here if possible
	return (
		<Tooltip label={'Return to Parent Page'}>
			<ActionIcon
				size="xl"
				pos="fixed"
				sx={{
					cursor: 'pointer',
					right: '2rem',
					bottom: '2rem',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: primary,
				}}
				onClick={() => router.push(parentPath)}>
				<ArrowBack style={{ cursor: 'pointer' }} />
			</ActionIcon>
		</Tooltip>
	);
};

export default BackButton;
