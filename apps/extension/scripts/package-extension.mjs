import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const extensionDir = resolve(fileURLToPath(new URL("..", import.meta.url)));
const repoRoot = resolve(extensionDir, "../..");
const releaseDir = resolve(repoRoot, "release");
const outputPath = resolve(releaseDir, "goaegis-extension.vsix");

mkdirSync(releaseDir, { recursive: true });

const result = spawnSync(
  "npx",
  ["--yes", "@vscode/vsce", "package", "--out", outputPath],
  {
    cwd: extensionDir,
    stdio: "inherit",
    shell: false
  }
);

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

// eslint-disable-next-line no-console
console.log(`Created ${outputPath}`);
