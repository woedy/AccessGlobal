# Image Optimization Guide

This document outlines the image optimization setup for the Access Global Foundation website.

## Features

- **Automatic Image Optimization**: Images are automatically optimized during build time
- **WebP Generation**: All images are converted to WebP format with fallbacks
- **Responsive Images**: Support for `srcset` and `sizes` attributes
- **Lazy Loading**: Native lazy loading for images below the fold
- **Modern Formats**: Support for WebP and AVIF formats

## How to Use

### Basic Usage

Use the `OptimizedImage` component for all images:

```tsx
import { OptimizedImage } from '@/utils/imageUtils';

function MyComponent() {
  return (
    <OptimizedImage
      src="/images/hero.jpg"
      alt="Hero image"
      width={1920}
      height={1080}
      className="w-full h-auto"
    />
  );
}
```

### Advanced Usage

For more control, use the `getResponsiveImage` function directly:

```tsx
import { getResponsiveImage } from '@/utils/imageUtils';

function MyComponent() {
  const image = getResponsiveImage('/images/hero', 1920, 1080, {
    sizes: '(max-width: 768px) 100vw, 50vw',
    quality: 90,
    formats: ['webp', 'avif', 'jpg'],
    breakpoints: [320, 640, 1024, 1280, 1920],
  });

  return (
    <picture>
      <source type="image/avif" srcSet={image.srcSet.avif} sizes={image.sizes} />
      <source type="image/webp" srcSet={image.srcSet.webp} sizes={image.sizes} />
      <img
        src={image.src}
        alt="Hero image"
        width={image.width}
        height={image.height}
        loading="lazy"
        className="w-full h-auto"
      />
    </picture>
  );
}
```

## Best Practices

1. **Always specify width and height** to prevent layout shifts
2. **Use descriptive alt text** for better accessibility
3. **Choose appropriate quality settings** (default is 80)
4. **Lazy load** images that are below the fold
5. **Use WebP format** for better compression

## Configuration

Image optimization is configured in `vite.config.ts` with the following defaults:

- Quality: 80%
- Supported formats: WebP with fallback to original format
- Optimization for: PNG, JPEG, WebP, GIF, TIFF, AVIF
- Public directory: Included in optimization

## Performance Impact

- **Build Time**: Image optimization happens during build time
- **Bundle Size**: No additional runtime overhead
- **CDN**: Optimized images are served with proper caching headers

## Testing

To verify image optimization:

1. Run `npm run build`
2. Check the `dist/assets` directory for optimized images
3. Use Lighthouse to verify image optimization in production

## Troubleshooting

- If images are not being optimized, check:
  - File extensions are correct
  - Images are in the correct directory
  - Build process completes without errors
  - No cache is interfering with the build process
