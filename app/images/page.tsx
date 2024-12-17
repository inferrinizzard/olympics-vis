import { Group, Stack, Title } from "@mantine/core";
import { getSportsForGames } from "app/games/_components/GamesSports/data";
import { MainPageLayout } from "components/layouts/main-page/MainPageLayout";
import { Image } from "components/util/Image";
import { getAllCountries, getAllGames, getAllSports } from "lib/db";
import { buildImageMapKey } from "lib/utils/getImageSrc";
import imageMap from "components/util/imageMap.json";
import { Fragment } from "react";

const ImagesAll = async () => {
	const games = await getAllGames({ select: { code: true } });
	const countries = await getAllCountries({
		select: { code: true, name: true },
	});
	const sports = await getAllSports({ select: { code: true, name: true } });

	const gamesSportsList = await Promise.all(
		games.map(async (game) => ({
			gamesWithSport: game,
			gameSports: await getSportsForGames({ games: game.code }),
		})),
	);

	return (
		<MainPageLayout title="Images">
			<Group>
				{games.map((game) => (
					<Stack key={game.code}>
						<Image
							dir="games"
							code={game.code}
							alt={game.code}
							width={100}
							height={100}
						/>
						<Title order={5}>{game.code}</Title>
					</Stack>
				))}
			</Group>
			<Group>
				{countries.map((country) => (
					<Stack key={country.code}>
						<Image
							dir="country"
							code={country.code}
							alt={country.code}
							width={100}
							height={100}
						/>
						<Title order={5}>{country.code}</Title>
					</Stack>
				))}
			</Group>
			<Group>
				{sports.map((sport) => (
					<Stack key={sport.code}>
						<Image
							dir="sports"
							code={sport.code}
							alt={sport.code}
							width={100}
							height={100}
						/>
						<Title order={5}>{sport.code}</Title>
					</Stack>
				))}
			</Group>

			{gamesSportsList.map(({ gamesWithSport, gameSports }) => {
				const specialPictograms = gameSports.filter((sport) => {
					const mapKey = buildImageMapKey("sports", sport, gamesWithSport.code);

					return mapKey in imageMap;
				});

				return specialPictograms.length ? (
					<Fragment key={`${gamesWithSport}_sports`}>
						<Title order={3}>{gamesWithSport.code}</Title>
						<Group>
							{gameSports.map((sport) => (
								<Stack key={sport}>
									<Image
										dir="sports"
										games={gamesWithSport.code}
										code={sport}
										alt={sport}
										width={100}
										height={100}
									/>
									<Title order={5}>{sport}</Title>
								</Stack>
							))}
						</Group>
					</Fragment>
				) : null;
			})}
		</MainPageLayout>
	);
};

export default ImagesAll;
