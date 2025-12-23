/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config) => {
    config.watchOptions = {
      ignored: '**/supabase/**',
    };
    return config;
  },
};

module.exports = nextConfig;
