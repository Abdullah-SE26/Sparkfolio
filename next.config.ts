import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true', // Enable with env variable
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
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

const sentryWebpackPluginOptions = {
  org: 'abdullah-sh',
  project: 'javascript-nextjs',

  silent: !process.env.CI,
  widenClientFileUpload: true,
  disableLogger: true,
  automaticVercelMonitors: true,
};

// Wrap nextConfig with bundle analyzer first
const withAnalyzer = bundleAnalyzer(nextConfig);

// Then wrap with Sentry
export default withSentryConfig(withAnalyzer, sentryWebpackPluginOptions);
