import type { StorybookConfig } from '@storybook/vue3'

const config: StorybookConfig = {
  stories: ['../examples/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@mindvalley/storybook-storyblok-addon',
      options: {
        spaceId: process.env.STORYBLOK_SPACE_ID || '',
        accessToken: process.env.STORYBLOK_TOKEN || '',
      },
    },
  ],
  framework: {
    name: '@storybook/vue3',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
}

export default config
