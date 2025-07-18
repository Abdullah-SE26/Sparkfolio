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
      {
      protocol: "https",
      hostname: "cdn.sanity.io", // for Sanity images
    },
    {
      protocol: "https",
      hostname: "avatars.githubusercontent.com", // GitHub profile images
    },
    {
      protocol: "https",
      hostname: "randomuser.me", // example avatars
    },
    {
      protocol: "https",
      hostname: "encrypted-tbn0.gstatic.com", // Google image search
    },
    {
      protocol: "https",
      hostname: "lh3.googleusercontent.com", // Google profile images
    },
    {
      protocol: "https",
      hostname: "pbs.twimg.com", // Twitter profile images
    },
  ],
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
