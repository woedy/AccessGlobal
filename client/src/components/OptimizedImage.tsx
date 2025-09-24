import React from 'react';
import { getOptimizedImagePath, getSrcSet, getSizes } from '../utils/imageUtils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'eager' | 'lazy';
  priority?: boolean;
  sizes?: string;
  style?: React.CSSProperties;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  priority = false,
  sizes,
  style,
  onError,
  onLoad,
  ...props
}: OptimizedImageProps) {
  // If the image is from the store_items directory, use the optimized version
  const isStoreImage = src?.includes('/store_items/');
  
  // For non-store images, use as is
  if (!isStoreImage) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        style={style}
        onError={onError}
        onLoad={onLoad}
        {...props}
      />
    );
  }
  
  // For store images, use the optimized WebP versions with srcSet
  const optimizedSrc = getOptimizedImagePath(src);
  const srcSetValue = getSrcSet(src);
  const sizesValue = sizes || getSizes();
  
  return (
    <picture>
      <source
        srcSet={srcSetValue}
        sizes={sizesValue}
        type="image/webp"
      />
      <img
        src={optimizedSrc}
        srcSet={srcSetValue}
        sizes={sizesValue}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        style={style}
        onError={onError}
        onLoad={onLoad}
        {...props}
      />
    </picture>
  );
}

export default OptimizedImage;
