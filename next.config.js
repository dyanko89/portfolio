/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: '/projects/gcx-platform',
        destination: '/projects/international-trading-platform',
        permanent: true,
      },
    ]
  },
  images: {
    // Generate responsive image sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Prefer modern formats
    formats: ['image/avif', 'image/webp'],
    // Allow quality=90 used in Image components
    qualities: [90],
    // Minimize quality for faster loads (still looks good)
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
}

module.exports = nextConfig;
