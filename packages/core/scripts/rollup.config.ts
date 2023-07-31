import path from 'node:path';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';
import { readJSONSync } from 'fs-extra';
import vue from 'rollup-plugin-vue';

import type { OutputOptions, RollupOptions } from 'rollup';

const { source } = readJSONSync(
  path.resolve(__dirname, '../package.json'),
  'utf-8');

console.log(source);

const configs: RollupOptions[] = [];
const formats = ['esm', 'cjs', 'umd'] as const;

for (const format of formats) {
  // A file with the extension ".mjs" will always be treated as ESM, even when pkg.type is "commonjs" (the default)
  // https://nodejs.org/docs/latest/api/packages.html#packages_determining_module_system
  const ext = format === 'esm' ? 'mjs' : 'js';

  const output: OutputOptions = {
    name: 'Vue3-google-map',
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
      esbuild(),
      resolve(),
      commonjs(),
      vue(),
    ],
  });
}

export default configs;
