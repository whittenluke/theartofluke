/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development practices
  reactStrictMode: true,
  
  // Image optimization settings
  images: {
    // Optimize images from external sources if needed
    remotePatterns: [],
    // Ensure high-quality images while maintaining performance
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Experimental features we might want to use
  experimental: {
    // Optimize CSS for faster page loads
    optimizeCss: true,
    // Enable scroll-driven animations when they become stable
    scrollRestoration: true,
  },

  // Add this section for critters
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Webpack configuration for optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimize SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  // Headers for security and performance
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          }
        ],
      }
    ];
  },

  // Compression for better performance
  compress: true,
}

module.exports = nextConfig
