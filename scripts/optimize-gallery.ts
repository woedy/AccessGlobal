import sharp from 'sharp';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GALLERY_PATH = path.join(__dirname, '..', 'client', 'public', 'assets', 'dhalia_works');
const OPTIMIZED_PATH = path.join(__dirname, '..', 'client', 'public', 'assets', 'optimized_gallery');

// Create optimized directory if it doesn't exist
await fs.ensureDir(OPTIMIZED_PATH);

// Get all image files in the gallery directory
const imageFiles = (await fs.readdir(GALLERY_PATH)).filter(file => 
  /\.(jpg|jpeg|png|webp)$/i.test(file)
);

console.log(`Found ${imageFiles.length} images to optimize...`);

// Process each image
for (const file of imageFiles) {
  const inputPath = path.join(GALLERY_PATH, file);
  const outputName = path.parse(file).name;
  const outputPath = path.join(OPTIMIZED_PATH, `${outputName}.webp`);
  
  console.log(`Optimizing ${file}...`);
  
  try {
    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    
    // Skip if already optimized
    if (await fs.pathExists(outputPath)) {
      const stats = await fs.stat(outputPath);
      if (stats.mtimeMs > (await fs.stat(inputPath)).mtimeMs) {
        console.log(`  ✓ Already optimized: ${path.basename(outputPath)}`);
        continue;
      }
    }
    
    // Create optimized WebP version
    await sharp(inputPath)
      .resize({
        width: Math.min(metadata.width || 1920, 1920), // Max width 1920px
        height: metadata.height ? Math.min(metadata.height, 1080) : undefined, // Max height 1080px
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({
        quality: 75,
        effort: 6,
        alphaQuality: 80
      })
      .toFile(outputPath);
    
    console.log(`  ✓ Created: ${path.basename(outputPath)}`);
    
  } catch (error) {
    console.error(`  ✗ Error optimizing ${file}:`, error);
  }
}

// Generate a manifest file with image metadata
const manifest = {
  generated: new Date().toISOString(),
  images: await Promise.all(
    (await fs.readdir(OPTIMIZED_PATH))
      .filter(file => file.endsWith('.webp'))
      .map(async (file) => {
        const filePath = path.join(OPTIMIZED_PATH, file);
        const stats = await fs.stat(filePath);
        const metadata = await sharp(filePath).metadata();
        
        return {
          name: file,
          size: stats.size,
          width: metadata.width,
          height: metadata.height,
          format: metadata.format,
          path: path.relative(
            path.join(process.cwd(), 'client', 'public'),
            filePath
          ).replace(/\\/g, '/')
        };
      })
  )
};

await fs.writeJson(
  path.join(OPTIMIZED_PATH, 'manifest.json'),
  manifest,
  { spaces: 2 }
);

console.log('\nOptimization complete!');
console.log(`Original gallery size: ${await getDirectorySize(GALLERY_PATH)}`);
console.log(`Optimized gallery size: ${await getDirectorySize(OPTIMIZED_PATH)}`);

async function getDirectorySize(directory: string): Promise<string> {
  const files = await fs.readdir(directory);
  let size = 0;
  
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stats = await fs.stat(filePath);
    size += stats.size;
  }
  
  return `${(size / 1024 / 1024).toFixed(2)} MB`;
}
