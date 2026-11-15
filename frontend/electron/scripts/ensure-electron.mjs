import { existsSync, rmSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const frontendRoot = path.resolve(__dirname, '..', '..')
const electronRoot = path.join(frontendRoot, 'node_modules', 'electron')
const pathFile = path.join(electronRoot, 'path.txt')
const distDir = path.join(electronRoot, 'dist')

// `--soft` (used from postinstall) never fails dependency installation:
// a missing Electron binary only matters for desktop packaging, and the
// desktop entrypoints invoke this script without the flag.
const soft = process.argv.includes('--soft')

const isComplete = () => existsSync(pathFile) && existsSync(distDir)

if (isComplete()) {
  process.exit(0)
}

if (!existsSync(path.join(electronRoot, 'install.js'))) {
  const message = 'Electron package is not installed; skipping binary check.'
  if (soft) {
    console.warn(message)
    process.exit(0)
  }
  console.error(message)
  process.exit(1)
}

console.warn('Electron runtime is incomplete. Re-running the Electron binary installer...')

// Drop the partial install so the installer starts from a clean slate.
rmSync(distDir, { recursive: true, force: true })
rmSync(pathFile, { force: true })

// Run electron's own installer directly with the current Node binary. Going
// through `npm install electron` is a no-op when the package is present but
// its binary is missing, and Windows refuses to spawn .cmd/.bat without a
// shell (Node EINVAL since CVE-2024-27980).
const installResult = spawnSync(process.execPath, [path.join(electronRoot, 'install.js')], {
  cwd: electronRoot,
  stdio: 'inherit',
  env: process.env,
})

if (installResult.error) {
  console.error(installResult.error)
}

if (isComplete()) {
  process.exit(0)
}

const failure = 'Electron binary is still missing after reinstall.'
if (soft) {
  console.warn(failure + ' Desktop packaging will fail until it is installed (npm run electron:ensure).')
  process.exit(0)
}
console.error(failure)
process.exit(1)
