import fs from 'fs-extra';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const repoRoot = path.resolve(__dirname, '..');
const distDir = path.join(repoRoot, 'dist');
const serverPublicDir = path.join(repoRoot, 'server', 'public');

async function main() {
  const exists = await fs.pathExists(distDir);
  if (!exists) {
    console.error(`Build output not found at ${distDir}. Did you run \`npm run build\`?`);
    process.exitCode = 1;
    return;
  }

  await fs.ensureDir(serverPublicDir);
  await fs.emptyDir(serverPublicDir);
  await fs.copy(distDir, serverPublicDir, { overwrite: true, errorOnExist: false });
  console.log(`Copied frontend build from ${distDir} to ${serverPublicDir}`);
}

main().catch((error) => {
  console.error('Failed to copy frontend build assets:', error);
  process.exitCode = 1;
});
