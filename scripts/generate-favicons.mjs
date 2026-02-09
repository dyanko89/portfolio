import sharp from 'sharp'

const SOURCE = 'public/assets/logo.png'

async function main() {
  // Load source at high res for quality downscaling
  const { data, info } = await sharp(SOURCE)
    .resize(512, 512)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  // Dark mode: white "dy" on transparent (remove black background)
  const darkData = Buffer.from(data)
  for (let i = 0; i < darkData.length; i += 4) {
    const brightness = (darkData[i] + darkData[i + 1] + darkData[i + 2]) / 3
    if (brightness < 128) {
      darkData[i + 3] = 0 // make dark pixels transparent
    }
  }

  // Light mode: dark "dy" on transparent (invert logo, remove background)
  const lightData = Buffer.from(data)
  for (let i = 0; i < lightData.length; i += 4) {
    const brightness = (lightData[i] + lightData[i + 1] + lightData[i + 2]) / 3
    if (brightness >= 128) {
      // White logo mark → make it dark (#0a0f12 to match site bg)
      lightData[i] = 10
      lightData[i + 1] = 15
      lightData[i + 2] = 18
      lightData[i + 3] = 255
    } else {
      // Black background → transparent
      lightData[i + 3] = 0
    }
  }

  const raw = { width: 512, height: 512, channels: 4 }

  // 32x32 favicons
  await sharp(darkData, { raw }).resize(32, 32).png().toFile('public/favicon-dark.png')
  await sharp(lightData, { raw }).resize(32, 32).png().toFile('public/favicon-light.png')

  // 180x180 apple-touch-icon (white on black — standard for iOS)
  await sharp(SOURCE).resize(180, 180).png().toFile('public/apple-touch-icon.png')

  // 192x192 for Android/PWA
  await sharp(darkData, { raw }).resize(192, 192).png().toFile('public/icon-192.png')
  await sharp(darkData, { raw }).resize(512, 512).png().toFile('public/icon-512.png')

  console.log('Favicons generated:')
  console.log('  public/favicon-dark.png (32x32)')
  console.log('  public/favicon-light.png (32x32)')
  console.log('  public/apple-touch-icon.png (180x180)')
  console.log('  public/icon-192.png (192x192)')
  console.log('  public/icon-512.png (512x512)')
}

main()
