import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
      images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },

  experimental: {
    serverExternalPackages: ['@sanity/client'],
  },
  // REMOVE the 'server' property here, it's invalid for next.config.js
  // 'host' and 'port' should be set elsewhere (e.g., your start script or Docker)
};

const sentryWebpackPluginOptions = {
  org: 'abdullah-sh',
  project: 'javascript-nextjs',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  disableLogger: true,
  automaticVercelMonitors: true,
};

const withAnalyzer = bundleAnalyzer(nextConfig);

export default withSentryConfig(withAnalyzer, sentryWebpackPluginOptions);
