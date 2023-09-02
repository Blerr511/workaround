const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    config.resolve.alias['@'] = require('path').resolve(__dirname, 'src');

    config.module.rules.push({
      test: /\.tsx?$/,
      include: [path.resolve(__dirname, '../../packages/ui/src')],
      use: [options.defaultLoaders.babel],
    });

    return config;
  },
};

module.exports = nextConfig;
