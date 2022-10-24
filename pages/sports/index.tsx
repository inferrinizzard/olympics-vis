import { type NextPage } from 'next';
import { type GetStaticProps, type InferGetStaticPropsType } from 'next';

import { PrismaClient, Sport } from '@prisma/client';

import { Title } from '@mantine/core';

import CardLink from 'components/layouts/CardLink';

export interface SportsProps {
	sports: Sport[];
}

export const getStaticProps: GetStaticProps<SportsProps> = async () => {
	const prisma = new PrismaClient();

	const sports = await prisma.sport.findMany();

	return { props: { sports } };
};

const Sports: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ sports }) => {
	return (
		<>
			<Title order={1}>{'Sports'}</Title>
			<section
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
					gap: '1rem',
				}}>
				{sports.map(({ sport, icon, name }) => (
					<CardLink
						key={sport}
						img={icon}
						alt={'Icon for ' + sport}
						href={`/sports/${sport}`}
						caption={name}
					/>
				))}
			</section>
		</>
	);
};

export default Sports;
