/**
 * Helper function to get the optimized image path
 * Converts from: /assets/store_items/Filename.png
 * To: /assets/optimized_store_items/Filename.webp
 */
export function getOptimizedImagePath(originalPath: string, width: number = 1024): string {
  if (!originalPath) return '';
  
  // Extract the filename without extension
  const filename = originalPath
    .split('/')
    .pop()
    ?.replace(/\.(png|jpg|jpeg|webp)$/i, '');
    
  if (!filename) return originalPath; // Return original if we can't parse it
  
  // Special handling for filenames with spaces
  const sanitizedFilename = filename.replace(/\s+/g, ' ').trim();
  
  // For the default (largest) size, use the base filename
  if (width === 1024) {
    return `/assets/optimized_store_items/${sanitizedFilename}.webp`;
  }
  
  // For other sizes, append the width
  return `/assets/optimized_store_items/${sanitizedFilename}@${width}w.webp`;
}

/**
 * Gets the optimized image paths for all available sizes
 */
export function getOptimizedImageSources(originalPath: string) {
  if (!originalPath) return [];
  
  // Define the widths we have optimized versions for
  const widths = [640, 1024, 1536];
  
  return widths.map(width => ({
    src: getOptimizedImagePath(originalPath, width),
    width,
    format: 'webp'
  }));
}

/**
 * Gets the srcSet string for an image
 */
export function getSrcSet(originalPath: string): string {
  const sources = getOptimizedImageSources(originalPath);
  return sources
    .map(src => `${src.src} ${src.width}w`)
    .join(', ');
}

/**
 * Gets the sizes attribute for responsive images
 */
export function getSizes(): string {
  return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
}
