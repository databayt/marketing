import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // TODO: re-enable once pre-existing pricing/wizard `any` types are
    // tightened (tracked separately).
    ignoreBuildErrors: true,
  },
  compiler: {
    // Strip console.* from production builds, keeping warn/error.
    removeConsole:
      process.env.NODE_ENV === 'production' ? { exclude: ['warn', 'error'] } : false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
