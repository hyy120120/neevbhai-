/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─── Images ───────────────────────────────────────────────────────────────
  // Vercel free tier only allows 1,000 image optimizations/month.
  // Unsplash already serves pre-optimised images via ?w=&q= query params,
  // so we skip Vercel's optimiser entirely to protect that quota.
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'static.wixstatic.com' },
      { protocol: 'https', hostname: '**.wixstatic.com' },
    ],
  },

  // ─── Compression ──────────────────────────────────────────────────────────
  compress: true,

  // ─── Headers ──────────────────────────────────────────────────────────────
  // Long-lived cache for static assets → cuts repeat-visitor bandwidth.
  async headers() {
    if (process.env.NODE_ENV === 'development') {
      return [];
    }

    return [
      {
        source: '/_next/static/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/(.*)\\.(ico|jpeg|jpg|png|svg|webp|woff2|woff)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },

  // ─── Experimental ─────────────────────────────────────────────────────────
  experimental: {
    // Inline CSS for faster first paint (reduces layout shift requests)
    optimizeCss: false, // keep false unless critters is installed
  },
};

module.exports = nextConfig;
