import { useState } from 'react';
import type { FC } from 'react';
import NextImage from 'next/image';
import type { ImageProps as NextImageProps } from 'next/image';

export type ImageProps = NextImageProps & {
  fallbackSrc?: NextImageProps['src'];
};

export const Image: FC<ImageProps> = ({ src, fallbackSrc = '', ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <NextImage
      {...props}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};
