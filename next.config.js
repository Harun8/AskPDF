/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    serverComponentsExternalPackages: ["pdf-parse"],
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.module.rules.push({
      test: /\.pdf$/i,
      type: "asset/source",
    });
    return config;
  },
};

module.exports = nextConfig;
