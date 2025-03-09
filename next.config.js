/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    serverComponentsExternalPackages: ["pdf-parse"],
  },
  async headers() {
    return [
      {
        source: "/videos/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800" }, // Cache videos for 7 days
        ],
      },
    ];
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

module.exports = withNextIntl(nextConfig);
