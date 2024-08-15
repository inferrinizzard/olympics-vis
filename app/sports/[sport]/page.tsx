import type { NextPage } from "next";

// import { getAllSports } from "lib/db";

// export async function generateStaticParams() {
// 	const sports = await getAllSports();

// 	return sports.map((params) => ({ params }));
// }

export const SportPage: NextPage<{ params: { sport: string } }> = async ({
	params: { sport },
}) => {
	return (
		<>
			<div>{sport}</div>
		</>
	);
};

export default SportPage;
