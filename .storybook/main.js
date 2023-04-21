module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  webpackFinal: async (config) => {
    // configure for absolute imports
    // config.resolve.plugins = [
    //   ...(config.resolve.plugins || []),
    //   new TsconfigPathsPlugin({
    //     extensions: config.resolve.extensions,
    //   }),
    // ];

    // disable whatever is already set to load SVGs
    // config.module.rules.filter((rule) => rule.test.test(".svg")).forEach((rule) => (rule.exclude = /\.svg$/i));

    // add SVGR instead
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
        },
        // {
        //   loader: "file-loader",
        //   options: {
        //     name: "static/media/[path][name].[ext]",
        //   },
        // },
      ],
      type: "javascript/auto",
      issuer: {
        and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
      },
    });

    return config;
  },
};
