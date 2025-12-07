import type { StorybookConfig } from '@storybook/react-vite';
import { fileURLToPath } from 'node:url';
import { URL } from 'node:url';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';

const config: StorybookConfig = {
  "stories": [
    "../resources/js/components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  "framework": "@storybook/react-vite",
  async viteFinal(config) {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      '@': fileURLToPath(new URL('../resources/js', import.meta.url)),
    };

    config.plugins = [
      ...(config.plugins ?? []),
      tailwindcss(),
      svgr(),
    ];

    return config;
  },
};
export default config;