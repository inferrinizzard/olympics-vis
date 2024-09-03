import Image, { type ImageProps } from "next/image";

import sharedFlags from "public/images/country/shared/sharedFlags.json";

export interface CountryImageProps extends ImageProps {
	code: string;
}

export const CountryImage = ({ code, ...props }: CountryImageProps) => {
	if (code in sharedFlags) {
		const sharedFlag = sharedFlags[code as keyof typeof sharedFlags];
		return <Image {...props} src={`/images/country/shared/${sharedFlag}`} />;
	}
	return <Image {...props} />;
};
