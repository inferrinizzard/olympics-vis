import type { NextPage } from 'next';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';

interface HeroProps {}

export const getStaticProps: GetStaticProps<HeroProps> = async () => {
	return { props: {} };
};

const Hero: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = () => {
	return <main></main>;
};

export default Hero;
