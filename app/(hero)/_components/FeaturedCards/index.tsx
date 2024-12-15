"use server";

import Link from "next/link";

import { Group, Stack, Title } from "@mantine/core";

import ChevronRight from "tabler-icons-react/dist/icons/chevron-right";

import CardLink from "components/layouts/main-page/CardLink";
import { getAllGames, getAllSports, getAllCountries } from "lib/db";
import { getGameName } from "lib/utils/getGameName";
import { MersenneTwister } from "lib/utils/mersenneTwister";

import * as classes from "./FeaturedCard.css";

const FeaturedCards = async () => {
	const games = await getAllGames({ select: { code: true } });
	const countries = await getAllCountries({
		select: { code: true, name: true },
	});
	const sports = await getAllSports({ select: { code: true, name: true } });

	const unixMs = +Date.now();
	const unixDays = Math.floor(unixMs / (24 * 60 * 60 * 1000));
	// @ts-ignore
	const mt = new MersenneTwister(unixDays);

	const featuredGames = games[Math.floor(mt.random() * games.length)];
	const featuredCountry = countries[Math.floor(mt.random() * countries.length)];
	const featuredSport = sports[Math.floor(mt.random() * sports.length)];

	return (
		<Stack className={classes.FeaturedCardsContainer}>
			<Stack gap="xs">
				<Title order={2}>{"Featured Games"}</Title>
				<CardLink
					imageProps={{
						dir: "games" as const,
						code: featuredGames.code,
						alt: `Olympic emblem for ${featuredGames.code}`,
					}}
					href={`/games/${featuredGames.code}`}
					caption={getGameName(featuredGames.code)}
				/>
				<Link passHref href="/games">
					<Group gap="xs">
						<Title order={3}>{"See All Games"}</Title>
						<ChevronRight />
					</Group>
				</Link>
			</Stack>

			<Stack gap="xs">
				<Title order={2}>{"Featured Country"}</Title>
				<CardLink
					imageProps={{
						dir: "country" as const,
						code: featuredCountry.code,
						alt: `Flag for ${featuredCountry.code}`,
						style: {
							filter: "drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.1))",
						},
					}}
					href={`/countries/${featuredCountry.code}`}
					caption={featuredCountry.code}
					secondary={featuredCountry.name}
					aspectRatio={"3 / 2"}
				/>
				<Link passHref href="/countries">
					<Group gap="xs">
						<Title order={3}>{"See All Countries"}</Title>
						<ChevronRight />
					</Group>
				</Link>
			</Stack>

			<Stack gap="xs">
				<Title order={2}>{"Featured Sport"}</Title>
				<CardLink
					imageProps={{
						dir: "sports" as const,
						code: featuredSport.code,
						alt: `Icon for ${featuredSport.code}`,
					}}
					href={`/sports/${featuredSport.code}`}
					caption={featuredSport.name}
				/>
				<Link passHref href="/sports">
					<Group gap="xs">
						<Title order={3}>{"See All Sports"}</Title>
						<ChevronRight />
					</Group>
				</Link>
			</Stack>
		</Stack>
	);
};

export default FeaturedCards;
