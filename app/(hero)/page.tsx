import { Box, Container, Title } from "@mantine/core";

import FeaturedCards from "./_components/FeaturedCards";

const HomePage = async () => {
	return (
		<Container fluid h="100%" p="xs">
			<Box
				style={{
					position: "absolute",
					height: "100%",
					width: "100%",
					left: 0,
					top: 0,
					opacity: "10%",
					backgroundImage: 'url("/images/country/shared/Olympic_flag.svg")',
					backgroundSize: "contain",
					pointerEvents: "none",
				}}
			/>
			<Box component="section">
				<Title order={1}>{"Olympics Vis"}</Title>
			</Box>

			<FeaturedCards />
		</Container>
	);
};

export default HomePage;
