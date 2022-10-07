export const sortByMedals = <Row extends { gold: number; silver: number; bronze: number }>(
	left: Row,
	right: Row
) =>
	compare(left.gold + left.silver + left.bronze, right.gold + right.silver + right.bronze) ||
	compare(left.gold, right.gold) ||
	compare(left.silver, right.silver) ||
	compare(left.bronze, right.bronze) ||
	1;

const compare = (left: number, right: number) => (left > right ? 1 : left < right ? -1 : 0);
