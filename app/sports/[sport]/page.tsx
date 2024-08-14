import type { NextPage } from "next";

// import { prisma } from "lib/db/prisma";

// export async function generateStaticParams() {
// 	const sports = await prisma.sport.findMany({ select: { sport: true } });

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
