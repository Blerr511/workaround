const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    config.resolve.symlinks = true;

    config.resolve.alias["@"] = require("path").resolve(__dirname, "src");

    config.module.rules.push({
      test: /\.tsx?$/,
      include: [path.resolve(__dirname, "../../packages/ui/src")],
      use: [
        {
          loader: "swc-loader",
          options: {
            configFile: path.resolve(__dirname, "../../packages/ui/.swcrc"),
            sourceMaps: false,
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.tsx?$/,
      include: [path.resolve(__dirname, "../../packages/core/src")],
      use: [
        {
          loader: "swc-loader",
          options: {
            configFile: path.resolve(__dirname, "../../packages/core/.swcrc"),
            sourceMaps: false,
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.tsx?$/,
      include: [
        path.resolve(__dirname, "../../../server/packages/backend-api/src"),
      ],
      use: [
        {
          loader: "swc-loader",
          options: {
            configFile: path.resolve(
              __dirname,
              "../../../server/packages/backend-api/.swcrc"
            ),
            sourceMaps: false,
          },
        },
      ],
    });

    // config.externals = [...config.externals, { canvas: "canvas" }];

    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    externalDir: true,
  },
};

module.exports = nextConfig;
