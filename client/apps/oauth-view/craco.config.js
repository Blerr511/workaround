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

      return webpackConfig;
    },
  },
};
