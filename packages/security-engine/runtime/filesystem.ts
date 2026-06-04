import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";

export interface TempWorkspace {
  directory: string;
  cleanup: () => void;
}

export function createTempWorkspace(prefix: string): TempWorkspace {
  const directory = mkdtempSync(`${tmpdir()}/${prefix}`);

  return {
    directory,
    cleanup() {
      rmSync(directory, { recursive: true, force: true });
    }
  };
}

export function readTextFile(path: string): string {
  return readFileSync(path, "utf8");
}

export function normalizeTargetPath(inputPath?: string): string {
  if (!inputPath) {
    return ".";
  }

  if (inputPath.startsWith("file://")) {
    const fileUrl = new URL(inputPath);
    return decodeURIComponent(fileUrl.pathname);
  }

  return inputPath;
}

