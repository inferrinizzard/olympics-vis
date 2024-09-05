import { existsSync, readdirSync, readFileSync } from "fs";
import Image, { getImageProps, type ImageProps } from "next/image";

import sharedFlags from "public/images/country/shared/sharedFlags.json";

export interface CountryImageProps extends ImageProps {
	code: string;
}

export const CountryImage = ({ code, ...props }: CountryImageProps) => {
	if (code in sharedFlags) {
		const sharedFlag = sharedFlags[code as keyof typeof sharedFlags];
		return (
			<Image
				{...props}
				src={`/images/country/shared/${sharedFlag}`}
				unoptimized={sharedFlag.endsWith(".svg")}
			/>
		);
	}

	if (existsSync(`public/images/country/${code}.svg`)) {
		return <Image {...props} src={`/images/country/${code}.svg`} unoptimized />;
	}

	return <Image {...props} src={`/images/country/${code}.png`} />;
	// const {
	// 	props: { srcSet: svg },
	// } = getImageProps({
	// 	...props,
	// 	src: `/images/country/${code}.svg`,
	// 	unoptimized: true,
	// });
	// const {
	// 	props: { srcSet: png, ...rest },
	// } = getImageProps({
	// 	...props,
	// 	src: `/images/country/${code}.png`,
	// });

	// return (
	// 	<picture>
	// 		<source type="image/svg" srcSet={svg} />
	// 		<source type="image/png" srcSet={png} />

	// 		<img {...rest} alt={`${code} Flag`} />
	// 	</picture>
	// );
};
