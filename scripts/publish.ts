import { execSync as exec } from 'node:child_process';

import path, { resolve } from 'node:path';
import { copyFileSync } from 'fs-extra';

exec('pnpm build', { stdio: 'inherit' });

const command = 'pnpm -r publish --access public --no-git-checks';

const readmePath = path.join(resolve(__dirname, '..'), 'README.md');
const mapReadmePath = path.join(resolve(__dirname, '../packages/map/README.md'));
const coreReadmePath = path.join(resolve(__dirname, '../packages/core/README.md'));

copyFileSync(readmePath, mapReadmePath);
copyFileSync(readmePath, coreReadmePath);

exec(`${command}`, { stdio: 'inherit' });
