import { useState } from "react";
import NextImage, { type ImageProps as NextImageProps } from "next/image";

interface ImageProps extends NextImageProps {
	fallback?: string;
}

export const Image = ({ fallback, src, ...props }: ImageProps) => {
	const [imgSrc, setImgSrc] = useState(src);

	return (
		<NextImage
			{...props}
			src={imgSrc}
			onError={() => setImgSrc(fallback ?? src)}
		/>
	);
};
