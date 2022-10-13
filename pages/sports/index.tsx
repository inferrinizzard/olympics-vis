import { type NextPage } from 'next';
import { type GetStaticProps, type InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { Card, Title, Image } from '@mantine/core';

import { PrismaClient, Sport } from '@prisma/client';

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
			<main
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
					gap: '1rem',
				}}>
				{sports.map(({ sport, icon, name }) => (
					<div key={sport}>
						<Link passHref href={`/sports/${sport}`}>
							<Card sx={{ cursor: 'pointer' }}>
								<Title order={2}>{`${sport}`}</Title>
								<Image
									src={icon}
									alt={'Icon for ' + sport}
									sx={{ maxHeight: '20vh', margin: 'auto' }}
								/>
								<Title order={6}>{name}</Title>
							</Card>
						</Link>
					</div>
				))}
			</main>
		</>
	);
};

export default Sports;
