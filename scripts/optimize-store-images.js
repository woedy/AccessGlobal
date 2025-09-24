import sharp from 'sharp';
import { readdirSync, existsSync, mkdirSync, statSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, extname, basename } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const STORE_ITEMS_PATH = join(__dirname, '..', 'client', 'public', 'assets', 'store_items');
const OPTIMIZED_STORE_ITEMS_PATH = join(__dirname, '..', 'client', 'public', 'assets', 'optimized_store_items');

// Supported image extensions
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];

// Create optimized directory if it doesn't exist
if (!existsSync(OPTIMIZED_STORE_ITEMS_PATH)) {
  mkdirSync(OPTIMIZED_STORE_ITEMS_PATH, { recursive: true });
}

// Process each image in the store items directory
async function optimizeImages() {
  try {
    const files = readdirSync(STORE_ITEMS_PATH);
    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;
    
    console.log('Starting image optimization...\n');
    
    for (const file of files) {
      const ext = extname(file).toLowerCase();
      
      // Skip non-image files
      if (!IMAGE_EXTENSIONS.includes(ext)) {
        console.log(`Skipping non-image file: ${file}`);
        continue;
      }
      
      const inputPath = join(STORE_ITEMS_PATH, file);
      const fileName = basename(file, ext);
      const outputBaseName = `${fileName}.webp`;
      const outputPath = join(OPTIMIZED_STORE_ITEMS_PATH, outputBaseName);
      
      // Get original file size
      const originalStats = statSync(inputPath);
      totalOriginalSize += originalStats.size;
      
      console.log(`Processing: ${file} (${(originalStats.size / 1024).toFixed(2)} KB)`);
      
      try {
        // Get image metadata
        const metadata = await sharp(inputPath).metadata();
        
        // Define target widths for responsive images
        const targetWidths = [
          Math.min(metadata.width, 2048),  // Max 2048px
          Math.min(metadata.width, 1024),  // 1024px or original width if smaller
          Math.min(metadata.width, 640)   // 640px or original width if smaller
        ];
        // Remove duplicates and sort in descending order
        const uniqueWidths = [...new Set(targetWidths)].sort((a, b) => b - a);
        
        // Generate optimized versions
        for (const width of uniqueWidths) {
            const outputFileName = width === uniqueWidths[0] 
              ? outputBaseName 
              : `${fileName}@${width}w.webp`;
              
            const outputFilePath = join(OPTIMIZED_STORE_ITEMS_PATH, outputFileName);
          
          await sharp(inputPath)
            .resize({
              width,
              height: Math.round(metadata.height * (width / metadata.width)),
              withoutEnlargement: true
            })
            .webp({
              quality: 80,
              alphaQuality: 80,
              effort: 6
            })
            .toFile(outputFilePath);
            
          const optimizedStats = statSync(outputFilePath);
          totalOptimizedSize += optimizedStats.size;
          
          console.log(`  → Created: ${outputFileName} (${(optimizedStats.size / 1024).toFixed(2)} KB, ${width}px wide)`);
        }
        
      } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
      }
    }
    
    // Print summary
    console.log('\n--- Optimization Complete ---');
    console.log(`Original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Optimized size: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Space saved: ${((1 - (totalOptimizedSize / totalOriginalSize)) * 100).toFixed(2)}%`);
    
  } catch (error) {
    console.error('Error during optimization:', error);
    process.exit(1);
  }
}

// Run the optimization
optimizeImages().catch(console.error);
