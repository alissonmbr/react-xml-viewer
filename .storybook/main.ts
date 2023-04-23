import type { StorybookConfig } from '@storybook/react-vite';
import viteTsconfig from 'vite-tsconfig-paths';

const { mergeConfig } = require('vite');

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [viteTsconfig()],
    });
  },
};
export default config;
