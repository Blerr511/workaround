const path = require("path");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const svgRuleIndex = webpackConfig.module.rules.findIndex((rule) =>
        rule.test?.toString().includes('svg')
      );

      console.group({
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      });

      if (svgRuleIndex !== -1) {
        webpackConfig.module.rules[svgRuleIndex] = {
          test: /\.svg$/,
          use: ['@svgr/webpack', 'url-loader'],
        };
      }

      const oneOfRule = webpackConfig.module.rules.find((rule) => rule.oneOf);

      if (oneOfRule) {
        // Modify the Babel loader
        const babelLoader = oneOfRule.oneOf.find(
          (rule) => rule.loader && rule.loader.includes('babel-loader')
        );

        if (babelLoader) {
          babelLoader.include = [
            path.resolve(__dirname, 'src'), // Include app source
            path.resolve(__dirname, '../../../server/packages/auth-api'), // Add your custom package path
          ];
        }

        // Modify the TypeScript loader
        const tsLoader = oneOfRule.oneOf.find(
          (rule) => rule.test && rule.test.toString().includes('ts')
        );

        if (tsLoader) {
          tsLoader.include = [
            path.resolve(__dirname, 'src'), // Include app source
            path.resolve(__dirname, '../../../server/packages/auth-api'), // Add your custom package path
          ];
        }
      }

      return webpackConfig;
    },
  },
};
