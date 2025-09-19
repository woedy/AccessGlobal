const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const GALLERY_PATH = path.join(__dirname, '..', 'client', 'public', 'assets', 'dhalia_works');
const OUTPUT_PATH = path.join(__dirname, '..', 'client', 'public', 'assets', 'optimized_gallery');

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_PATH)) {
  fs.mkdirSync(OUTPUT_PATH, { recursive: true });
}

// Process each image in the gallery
async function processImages() {
  try {
    const files = fs.readdirSync(GALLERY_PATH);
    
    for (const file of files) {
      if (/\.(jpg|jpeg|png)$/i.test(file)) {
        const inputPath = path.join(GALLERY_PATH, file);
        const outputName = path.parse(file).name;
        const outputPath = path.join(OUTPUT_PATH, `${outputName}.webp`);
        
        console.log(`Processing ${file}...`);
        
        // Get image dimensions
        const { width, height } = await sharp(inputPath).metadata();
        
        // Create responsive sizes (1x, 0.75x, 0.5x, 0.25x of original size)
        const sizes = [1, 0.75, 0.5, 0.25];
        
        // Generate WebP versions with different sizes
        for (const size of sizes) {
          const newWidth = Math.round(width * size);
          const newHeight = Math.round(height * size);
          const sizeOutputPath = path.join(
            OUTPUT_PATH, 
            `${outputName}-${newWidth}x${newHeight}.webp`
          );
          
          await sharp(inputPath)
            .resize(newWidth, newHeight, {
              fit: 'inside',
              withoutEnlargement: true
            })
            .webp({
              quality: 80,
              effort: 6
            })
            .toFile(sizeOutputPath);
            
          console.log(`  Created: ${path.basename(sizeOutputPath)}`);
        }
      }
    }
    
    console.log('\nOptimization complete!');
    console.log(`Original gallery size: ${getDirectorySize(GALLERY_PATH) / 1024} KB`);
    console.log(`Optimized gallery size: ${getDirectorySize(OUTPUT_PATH) / 1024} KB`);
    
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

function getDirectorySize(directory) {
  const files = fs.readdirSync(directory);
  let size = 0;
  
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);
    size += stats.size;
  }
  
  return size;
}

// Run the script
processImages();
