import type { NextConfig } from 'next';

const adminSlug = process.env.ADMIN_PANEL_SLUG?.trim();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    if (!adminSlug) return [];
    return [
      { source: `/${adminSlug}`, destination: '/admin' },
      { source: `/${adminSlug}/:path*`, destination: '/admin/:path*' },
    ];
  },
  /** Снижает «битый» webpack-cache на Windows (ENOENT *.pack.gz, missing chunk NNN.js). */
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
