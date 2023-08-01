import { execSync as exec } from 'node:child_process';
import consola from 'consola';

async function build() {
  consola.log('Clean up');
  exec('pnpm clean', { stdio: 'inherit' });

  consola.log('Run Rollup build');
  exec('pnpm build:rollup', { stdio: 'inherit' });

  consola.success('Build Success');
}

async function execBuild() {
  try {
    await build();
  }
  catch (error) {
    consola.error(error);
  }
}

if (require.main === module)
  execBuild();
