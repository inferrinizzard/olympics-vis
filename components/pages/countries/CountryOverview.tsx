import { Country } from '@prisma/client';

import { Box, Image, Title } from '@mantine/core';
import { Calendar, Hash } from 'tabler-icons-react';

import GridCell from 'components/grid/GridCell';
import StatCard from 'components/grid/StatCard';

interface CountryOverviewProps {
	country: Country;
}

const CountryOverview: React.FC<CountryOverviewProps> = ({ country }) => {
	return (
		<GridCell sx={{ height: '100%' }}>
			<Title order={1}>{`${country.name} (${country.country})`}</Title>
			<div style={{ maxHeight: '50%' }}>
				<Image
					src={country.flag}
					alt={'NOC Flag for ' + country.country}
					fit={'scale-down' as 'contain'}
				/>
			</div>
			<Box p="xs" sx={{ display: 'flex', rowGap: '1rem', flexDirection: 'column' }}>
				<StatCard Icon={Calendar} title={'First Games'} text={''} />
				<StatCard Icon={Hash} title={'Total Medals'} text={''} />
				<StatCard Icon={Hash} title={'Games Hosted'} text={''} />
			</Box>
		</GridCell>
	);
};

export default CountryOverview;
