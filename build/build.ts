import { URL, fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { replaceCodePlugin } from 'vite-plugin-replace';
import VitePluginStyleInject from 'vite-plugin-style-inject';
import VueMacros from 'unplugin-vue-macros/vite';
import dts from 'vite-plugin-dts';

import options from '../vue-macros.config';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('../packages/map/src', import.meta.url)),
    },
    preserveSymlinks: false,
    dedupe: ['vue'],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  build: {
    outDir: 'dist',
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, '../packages/map/src/index.ts'),
      name: '@voomap/map',
      formats: ['es', 'cjs', 'umd'],
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      // NOTE: Consider installing @voomap/core as an external dependency once the project is finalized.
      // external: ['vue', /^@voomap.*/],
      external: ['vue'],
      output: {
        globals: {
          'vue': 'Vue',
          '@voomap/core': 'VoomapCore',
        },
      },
    },
  },
  plugins: [
    replaceCodePlugin({
      replacements: [
        {
          from: '__DEV__',
          to: '(process.env.NODE_ENV !== \'production\')',
        },
      ],
    }),
    VitePluginStyleInject(),
    VueMacros(options),
    dts({
      outDir: 'dist/types',
      rollupTypes: true,
    }),
  ],
});
