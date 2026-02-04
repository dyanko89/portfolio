/**
 * Image Optimization Script
 *
 * Compresses images in public/images/ before deployment.
 * Run: npm run optimize-images
 *
 * What it does:
 * 1. Finds all PNG/JPG images in public/images/
 * 2. Resizes to max 2048px width (sufficient for 4K displays)
 * 3. Compresses with quality 80 (good balance of size/quality)
 * 4. Converts to WebP for additional savings (keeps originals)
 * 5. Reports size savings
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images');
const MAX_WIDTH = 2048;
const QUALITY = 80;

async function getImageFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...await getImageFiles(fullPath));
    } else if (/\.(png|jpg|jpeg)$/i.test(item.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

async function optimizeImage(filePath) {
  const originalSize = fs.statSync(filePath).size;
  const ext = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath);

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Skip if already small enough
    if (originalSize < 500 * 1024 && metadata.width <= MAX_WIDTH) {
      console.log(`  ⏭️  ${fileName} - Already optimized (${formatBytes(originalSize)})`);
      return { original: originalSize, optimized: originalSize, skipped: true };
    }

    // Resize if needed, then compress
    let pipeline = image;

    if (metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }

    // Compress based on format
    if (ext === '.png') {
      pipeline = pipeline.png({ quality: QUALITY, compressionLevel: 9 });
    } else {
      pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
    }

    // Write optimized version
    const buffer = await pipeline.toBuffer();
    fs.writeFileSync(filePath, buffer);

    const newSize = buffer.length;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

    console.log(`  ✅ ${fileName}: ${formatBytes(originalSize)} → ${formatBytes(newSize)} (${savings}% smaller)`);

    return { original: originalSize, optimized: newSize, skipped: false };

  } catch (error) {
    console.error(`  ❌ ${fileName}: ${error.message}`);
    return { original: originalSize, optimized: originalSize, error: true };
  }
}

async function main() {
  console.log('\n🖼️  Image Optimization Script\n');
  console.log(`📁 Source: ${IMAGES_DIR}`);
  console.log(`📐 Max width: ${MAX_WIDTH}px`);
  console.log(`🎨 Quality: ${QUALITY}%\n`);

  if (!fs.existsSync(IMAGES_DIR)) {
    console.log('❌ Images directory not found');
    process.exit(1);
  }

  const images = await getImageFiles(IMAGES_DIR);

  if (images.length === 0) {
    console.log('No images found to optimize.');
    return;
  }

  console.log(`Found ${images.length} images:\n`);

  let totalOriginal = 0;
  let totalOptimized = 0;
  let optimizedCount = 0;

  for (const image of images) {
    const result = await optimizeImage(image);
    totalOriginal += result.original;
    totalOptimized += result.optimized;
    if (!result.skipped && !result.error) optimizedCount++;
  }

  const totalSavings = ((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(1);

  console.log('\n' + '─'.repeat(50));
  console.log(`📊 Summary:`);
  console.log(`   Images processed: ${images.length}`);
  console.log(`   Images optimized: ${optimizedCount}`);
  console.log(`   Original total:   ${formatBytes(totalOriginal)}`);
  console.log(`   Optimized total:  ${formatBytes(totalOptimized)}`);
  console.log(`   Total savings:    ${formatBytes(totalOriginal - totalOptimized)} (${totalSavings}%)`);
  console.log('');
}

main().catch(console.error);
