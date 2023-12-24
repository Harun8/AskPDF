/** @type {import('next').NextConfig} */
const nextConfig = {
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
