import { execSync as exec } from 'node:child_process';
import path from 'node:path';
import consola from 'consola';
import { readJSONSync } from 'fs-extra';

exec('pnpm build', { stdio: 'inherit' });

const command = 'npm publish --access public';

const { name, version } = readJSONSync(
  path.resolve(__dirname, '../package.json'),
  'utf-8',
);

exec(`${command}`, { stdio: 'inherit' });

consola.success(`Published ${name} v${version}`);
