import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    preset: 'src/preset.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  // Target ES2017 for webpack4 compatibility (used by Storybook 6.x)
  // This transpiles optional chaining (?.) and nullish coalescing (??) to compatible code
  target: 'es2017',
  external: [
    'react',
    'react-dom',
    '@storybook/addons',
    '@storybook/api',
    '@storybook/components',
    '@storybook/theming',
  ],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    }
  },
})
