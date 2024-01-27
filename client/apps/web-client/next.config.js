const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    config.resolve.alias["@"] = require("path").resolve(__dirname, "src");

    config.module.rules.push({
      test: /\.tsx?$/,
      include: [path.resolve(__dirname, "../../packages/ui/src")],
      use: [
        {
          loader: "swc-loader",
          options: {
            // Load the .swcrc file from the specified location
            configFile: path.resolve(__dirname, "../../packages/ui/.swcrc"),
            sourceMaps: false,
          },
        },
      ],
    });

    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
