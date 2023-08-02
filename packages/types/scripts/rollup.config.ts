import path from 'node:path';
import { readJSONSync } from 'fs-extra';
import dts from 'rollup-plugin-dts';

import type { RollupOptions } from 'rollup';

const { source } = readJSONSync(
  path.resolve(__dirname, '../package.json'),
  'utf-8');

const configs: RollupOptions[] = [];

configs.push({
  input: source,
  output: {
    file: 'dist/index.d.ts',
    format: 'es',
  },
  plugins: [dts()],
});

export default configs;
