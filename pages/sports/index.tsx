import { type NextPage } from 'next';
import { type GetStaticProps, type InferGetStaticPropsType } from 'next';

import { PrismaClient, type Games, type Sport } from '@prisma/client';

import { Title } from '@mantine/core';

import CardLink from 'components/layouts/CardLink';

export interface SportsProps {
	sports: Sport[];
	currentSports: {
		summer: Sport['sport'][];
		winter: Sport['sport'][];
	};
}

export const getStaticProps: GetStaticProps<SportsProps> = async () => {
	const prisma = new PrismaClient();

	const sports = await prisma.sport.findMany();

	const sportsList: (Pick<Games, 'season'> & { sport: Sport['sport'][] })[] =
		await prisma.$queryRaw`
		SELECT sport, season
		FROM (
			SELECT DISTINCT ON (season) game, season
			FROM games_detail
			ORDER BY season, year DESC
		) latest_games
		JOIN (
			SELECT ARRAY_AGG(DISTINCT sport) AS sport, game
			FROM sports_events
			GROUP BY game
		) sports
		ON latest_games.game = sports.game
		;
	`;

	const currentSports = sportsList.reduce(
		(acc, { season, sport }) => ({ ...acc, [season]: sport }),
		{} as SportsProps['currentSports']
	);

	return { props: { sports, currentSports } };
};

const Sports: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
	sports,
	currentSports,
}) => {
	const groupedSports = sports.reduce(
		(acc, sport) => {
			if (currentSports.summer.includes(sport.sport)) {
				return { ...acc, summer: [...acc.summer, sport] };
			} else if (currentSports.winter.includes(sport.sport)) {
				return { ...acc, winter: [...acc.winter, sport] };
			}
			return { ...acc, historic: [...acc.historic, sport] };
		},
		{
			summer: [],
			winter: [],
			historic: [],
		} as Record<string, Sport[]>
	);

	return (
		<>
			<Title order={1}>{'Sports'}</Title>
			{Object.entries(groupedSports).map(([group, sportList]) => (
				<section key={group}>
					<Title order={2}>{group.slice(0, 1).toUpperCase() + group.slice(1)}</Title>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
							gap: '1rem',
						}}>
						{sportList.map(({ sport, icon, name }) => (
							<CardLink
								key={sport}
								img={icon}
								alt={'Icon for ' + sport}
								href={`/sports/${sport}`}
								caption={name}
							/>
						))}
					</div>
				</section>
			))}
		</>
	);
};

export default Sports;
