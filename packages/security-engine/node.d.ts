declare module "node:child_process" {
  export interface SpawnSyncOptions {
    cwd?: string;
    env?: Record<string, string | undefined>;
    encoding?: "utf8";
    maxBuffer?: number;
  }

  export interface SpawnSyncReturns<T = string> {
    pid: number;
    output: Array<T | null>;
    stdout: T;
    stderr: T;
    status: number | null;
    signal: string | null;
    error?: Error;
  }

  export function spawnSync(
    command: string,
    args?: readonly string[],
    options?: SpawnSyncOptions
  ): SpawnSyncReturns<string>;
}

declare module "node:fs" {
  export function mkdtempSync(prefix: string): string;
  export function readFileSync(path: string, encoding: "utf8"): string;
  export function rmSync(path: string, options?: { recursive?: boolean; force?: boolean }): void;
}

declare module "node:os" {
  export function tmpdir(): string;
}

