// @ts-check

import path from 'node:path';
import { readJSONSync } from 'fs-extra';
import replace from '@rollup/plugin-replace';
import alias from '@rollup/plugin-alias'
import VueMacros from 'unplugin-vue-macros/rollup';
import NodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';

import type { OutputOptions, RollupOptions } from 'rollup';

import options from '../vue-macros.config.js';

const { source } = readJSONSync(
  path.resolve(__dirname, '../package.json'),
  'utf-8');

const configs: RollupOptions[] = [];
const formats = ['esm', 'cjs', 'umd'] as const;

for (const format of formats) {
  // A file with the extension ".mjs" will always be treated as ESM, even when pkg.type is "commonjs" (the default)
  // https://nodejs.org/docs/latest/api/packages.html#packages_determining_module_system
  const ext = format === 'esm' ? 'mjs' : 'js';

  const output: OutputOptions = {
    name: 'Voomap',
    file: `dist/index.${[format, ext].join('.')}`,
    format,
    globals: {
      vue: 'Vue',
      '@voomap/core': 'VoomapCore'
    },
  };

  configs.push({
    input: source,
    output,
    external: ['vue', '@voomap/core'],
    plugins: [
      replace({
        preventAssignment: true,
        values: {
          __DEV__:
            format === 'esm'
              ? '(process.env.NODE_ENV !== \'production\')'
              : 'false',
        },
      }),
      alias({
        entries: [{
          find: '@',
          replacement: new URL('./src', import.meta.url).pathname
        }]
      }),
      VueMacros(options),
      NodeResolve(),
      commonjs(),
      esbuild({
        sourceMap: true,
        target: 'esnext',
        loaders: {
          '.vue': 'ts',
        },
      }),

      postcss(),
    ],
  });
}

configs.push({
  input: 'map-vue.d.ts',
  output: {
    file: 'dist/index.d.ts',
    format: 'es',
  },
  plugins: [dts()],
});

export default configs;
