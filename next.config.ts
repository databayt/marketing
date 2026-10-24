import path from "node:path";

import type { NextConfig } from "next";

// Cloudflare Workers lane (scripts/deploy-cloudflare.sh sets CF_WORKERS=1): OpenNext bundles the
// server into one Worker, so Prisma/pg stay bundled and the image optimizer is off.
const CF_WORKERS = Boolean(process.env.CF_WORKERS);

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // The /_next/image optimizer would need Cloudflare Images (paid) on Workers: serve originals.
    ...(CF_WORKERS ? { unoptimized: true } : {}),
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
  // Workers can't compile WebAssembly from bytes, so Prisma's workerd runtime imports its query
  // compiler as `./query_compiler_fast_bg.wasm?module`. Keep that a runtime import with an
  // absolute path so OpenNext marks it external and wrangler uploads the .wasm as a module.
  ...(CF_WORKERS
    ? {
        webpack: (config: { externals?: unknown }, { isServer }: { isServer: boolean }) => {
          if (!isServer) return config;
          const existing = config.externals ? (Array.isArray(config.externals) ? config.externals : [config.externals]) : [];
          config.externals = [
            ...existing,
            ({ request, context }: { request?: string; context?: string }, callback: (err?: Error | null, result?: string) => void) => {
              if (request?.endsWith(".wasm?module") && context) {
                const file = path.resolve(context, request.slice(0, -"?module".length));
                return callback(null, `import ${file}?module`);
              }
              callback();
            },
          ];
          return config;
        },
      }
    : {}),
};

export default nextConfig;
