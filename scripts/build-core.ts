import { URL, fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { replaceCodePlugin } from 'vite-plugin-replace';
import dts from 'vite-plugin-dts';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('../packages/core/src', import.meta.url)),
    },
    preserveSymlinks: false,
    dedupe: ['vue'],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  build: {
    outDir: 'dist',
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, '../packages/core/src/index.ts'),
      name: '@voomap/map',
      formats: ['es', 'cjs', 'umd'],
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', /^@googlemaps.*/],
      output: {
        globals: {
          'vue': 'Vue',
          '@googlemaps/js-api-loader': 'JsApiLoader',
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
    dts({
      rollupTypes: true,
    }),
  ],
});
