import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component';

interface ImageProps extends Pick<LazyLoadImageProps, 'className'> {
  src: string |undefined;
  alt?: string;
  fallback:string;
}

const Image = ({ src, alt, fallback, className }: ImageProps) => {
  return (
    <LazyLoadImage
      src={src||fallback}
      alt={alt||"image-alt"}
      className={className}
    />
  );
};

export default Image;
