/**
 * Image utility functions for handling responsive images and WebP conversion
 */

type ImageSource = {
  src: string;
  width: number;
  height: number;
  format?: 'avif' | 'webp' | 'jpg' | 'png' | 'gif';
  quality?: number;
};

/**
 * Generates a responsive image source set with WebP and fallbacks
 * @param basePath - Path to the image without extension
 * @param width - Original image width
 * @param height - Original image height
 * @param options - Additional options
 * @returns Object containing srcSet and sizes for both WebP and original format
 */
export function getResponsiveImage(
  basePath: string,
  width: number,
  height: number,
  options: {
    sizes?: string;
    quality?: number;
    formats?: Array<'webp' | 'avif' | 'jpg' | 'png'>;
    breakpoints?: number[];
  } = {}
) {
  const {
    sizes = '(max-width: 1024px) 100vw, 1024px',
    quality = 80,
    formats = ['webp', 'jpg'],
    breakpoints = [320, 640, 768, 1024, 1280, 1536],
  } = options;

  // Filter breakpoints that are smaller than the original width
  const validBreakpoints = breakpoints.filter((bp) => bp < width);
  const srcSet: Record<string, string> = {};

  formats.forEach((format) => {
    srcSet[format] = validBreakpoints
      .map((bp) => {
        const ratio = Math.min(bp / width, 1);
        const h = Math.round(height * ratio);
        const w = Math.round(width * ratio);
        return `${basePath}-${w}x${h}.${format} ${w}w`;
      })
      .concat(`${basePath}.${formats[0]} ${width}w`)
      .join(', ');
  });

  return {
    srcSet,
    sizes,
    src: `${basePath}.${formats[0]}`,
    width,
    height,
  };
}

/**
 * Simple image component that handles lazy loading and WebP with fallback
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  loading: loadingProp = 'lazy',
  ...props
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  [key: string]: any;
}) {
  // Check if the image is in the public directory
  const isPublic = src.startsWith('/');
  const imagePath = isPublic ? src : `/${src}`;
  
  // Get the base path without extension
  const basePath = imagePath.replace(/\.[^/.]+$/, '');
  
  // Generate responsive image data
  const { srcSet } = getResponsiveImage(basePath, width, height);

  return (
    <picture>
      {/* WebP source */}
      <source
        type="image/webp"
        srcSet={srcSet['webp']}
        sizes="(max-width: 1024px) 100vw, 1024px"
      />
      {/* Fallback source */}
      <source
        srcSet={srcSet['jpg'] || srcSet['png'] || imagePath}
        sizes="(max-width: 1024px) 100vw, 1024px"
      />
      {/* Fallback img element */}
      <img
        src={imagePath}
        alt={alt}
        width={width}
        height={height}
        loading={loadingProp}
        className={className}
        {...props}
      />
    </picture>
  );
}
