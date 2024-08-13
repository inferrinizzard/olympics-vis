import gamesImages from './gameImages.json';

export const getGameName = (gamesId: string) => {
  const slugs = gamesId.split('-');
  if (/^\d{4}/.test(gamesId)) {
    let [year, season] = slugs;
    season = season[0].toUpperCase() + season.slice(1);
    return `${season} ${year}`;
  }
  const year = slugs.pop();
  const city = slugs
    .map((slug) => slug[0].toUpperCase() + slug.slice(1))
    .join(' ');

  return `${city} ${year}`;
};

export const getGameImage = (gamesId: string) => {
  return gamesImages[gamesId as keyof typeof gamesImages];
};

export const sortByMedals = <
  Row extends { gold: number; silver: number; bronze: number }
>(
  left: Row,
  right: Row
) =>
  compare(
    left.gold + left.silver + left.bronze,
    right.gold + right.silver + right.bronze
  ) ||
  compare(left.gold, right.gold) ||
  compare(left.silver, right.silver) ||
  compare(left.bronze, right.bronze) ||
  1;

const compare = (left: number, right: number) =>
  left > right ? 1 : left < right ? -1 : 0;

export const searchFilter =
  <T extends Record<string, string | number>>(
    keys: (keyof T)[],
    search: string
  ) =>
  (item: T) =>
    !search ||
    keys.some((key) => item[key].toString().toLowerCase().includes(search));
