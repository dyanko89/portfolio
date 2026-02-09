import sharp from 'sharp'

// Source: the nav bar logo SVG
const SVG_SOURCE = 'public/assets/djy89.svg'

// Create an SVG string with a specific fill color on a transparent background
function createColoredSvg(fill) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 765 765">
    <g transform="translate(63, 0)">
      <rect x="96.4" y="485.9" fill="${fill}" width="96" height="48"/>
      <path fill="${fill}" d="M476.9,288.4c-6.2-6.2-12.7-12-19.5-17.4c6.8-5.4,13.3-11.2,19.5-17.4c20.4-20.4,36.5-44.3,47.7-70.8c11.6-27.5,17.6-56.7,17.6-86.8h-96c0,70.1-56.8,126.9-126.9,126.9c-70.1,0-126.9-56.8-126.9-126.9h-96c0,30,5.9,59.2,17.6,86.8c11.2,26.6,27.3,50.4,47.7,70.8c6.2,6.2,12.7,12,19.5,17.4c-6.8,5.4-13.3,11.2-19.5,17.4c-20.4,20.4-36.5,44.3-47.7,70.8C102.3,386.8,96.4,416,96.4,446h96c0-70.1,56.8-126.9,126.9-126.9c70.1,0,126.9,56.8,126.9,126.9s-56.8,126.9-126.9,126.9H96.4v96h222.9c30,0,59.2-5.9,86.8-17.6c26.6-11.2,50.4-27.3,70.8-47.7c20.4-20.4,36.5-44.3,47.7-70.8c11.6-27.5,17.6-56.7,17.6-86.8s-5.9-59.2-17.6-86.8C513.4,332.7,497.3,308.8,476.9,288.4z"/>
    </g>
  </svg>`
}

// Apple touch icon: white mark on black background
function createAppleTouchSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 765 765">
    <rect width="765" height="765" fill="#0a0f12"/>
    <g transform="translate(63, 0)">
      <rect x="96.4" y="485.9" fill="#ffffff" width="96" height="48"/>
      <path fill="#ffffff" d="M476.9,288.4c-6.2-6.2-12.7-12-19.5-17.4c6.8-5.4,13.3-11.2,19.5-17.4c20.4-20.4,36.5-44.3,47.7-70.8c11.6-27.5,17.6-56.7,17.6-86.8h-96c0,70.1-56.8,126.9-126.9,126.9c-70.1,0-126.9-56.8-126.9-126.9h-96c0,30,5.9,59.2,17.6,86.8c11.2,26.6,27.3,50.4,47.7,70.8c6.2,6.2,12.7,12,19.5,17.4c-6.8,5.4-13.3,11.2-19.5,17.4c-20.4,20.4-36.5,44.3-47.7,70.8C102.3,386.8,96.4,416,96.4,446h96c0-70.1,56.8-126.9,126.9-126.9c70.1,0,126.9,56.8,126.9,126.9s-56.8,126.9-126.9,126.9H96.4v96h222.9c30,0,59.2-5.9,86.8-17.6c26.6-11.2,50.4-27.3,70.8-47.7c20.4-20.4,36.5-44.3,47.7-70.8c11.6-27.5,17.6-56.7,17.6-86.8s-5.9-59.2-17.6-86.8C513.4,332.7,497.3,308.8,476.9,288.4z"/>
    </g>
  </svg>`
}

async function main() {
  const whiteSvg = Buffer.from(createColoredSvg('#ffffff'))
  const darkSvg = Buffer.from(createColoredSvg('#0a0f12'))
  const appleSvg = Buffer.from(createAppleTouchSvg())

  // 32x32 PNG favicons (fallback for browsers that don't support SVG favicons)
  await sharp(whiteSvg).resize(32, 32).png().toFile('public/favicon-dark.png')
  await sharp(darkSvg).resize(32, 32).png().toFile('public/favicon-light.png')

  // 180x180 apple-touch-icon (white on dark bg — standard for iOS)
  await sharp(appleSvg).resize(180, 180).png().toFile('public/apple-touch-icon.png')

  // 192x192 and 512x512 for Android/PWA
  await sharp(whiteSvg).resize(192, 192).png().toFile('public/icon-192.png')
  await sharp(whiteSvg).resize(512, 512).png().toFile('public/icon-512.png')

  console.log('Favicons generated from djy89.svg:')
  console.log('  public/favicon.svg (theme-adaptive)')
  console.log('  public/favicon-dark.png (32x32, white mark)')
  console.log('  public/favicon-light.png (32x32, dark mark)')
  console.log('  public/apple-touch-icon.png (180x180)')
  console.log('  public/icon-192.png (192x192)')
  console.log('  public/icon-512.png (512x512)')
}

main()
