// @ts-check

import path from 'node:path';
import { readJSONSync } from 'fs-extra';
import VueMacros from 'unplugin-vue-macros/rollup';
import NodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
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
    name: 'VoomapCore',
    file: `dist/index.${[format, ext].join('.')}`,
    format,
    globals: {
      vue: 'Vue',
    },
  };

  configs.push({
    input: source,
    output,
    external: ['vue'],
    plugins: [
      VueMacros(options),
      NodeResolve(),
      commonjs(),
      esbuild({
        target: 'esnext',
      }),
    ],
  });
}

configs.push({
  input: source,
  output: {
    file: 'dist/index.d.ts',
    format: 'es',
  },
  plugins: [dts()],
});

export default configs;
