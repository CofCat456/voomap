import { execSync as exec } from 'node:child_process';
import path from 'node:path';
import consola from 'consola';
import { readJSONSync } from 'fs-extra';

exec('pnpm build', { stdio: 'inherit' });

const command = 'pnpm publish --access public';

const { name, version } = readJSONSync(
  path.resolve(__dirname, '../package.json'),
  'utf-8',
);

const tag = version.includes('beta')
  ? 'beta'
  : version.includes('rc')
    ? 'rc'
    : null;

exec(`${command}${tag ? ` --tag ${tag}` : ''}`, { stdio: 'inherit' });

consola.success(`Published ${name} v${version}`);
