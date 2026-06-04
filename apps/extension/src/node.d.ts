declare module "node:child_process" {
  export interface SpawnSyncOptions {
    cwd?: string;
    encoding?: "utf8";
    maxBuffer?: number;
  }

  export interface SpawnSyncReturns<T = string> {
    stdout: T;
    stderr: T;
    status: number | null;
    error?: Error;
  }

  export function spawnSync(
    command: string,
    args?: readonly string[],
    options?: SpawnSyncOptions
  ): SpawnSyncReturns<string>;
}

declare module "node:assert/strict" {
  const assert: {
    equal(actual: unknown, expected: unknown, message?: string): void;
  };

  export default assert;
}

declare module "node:crypto" {
  export function randomUUID(): string;
}

declare module "node:fs" {
  export function mkdtempSync(prefix: string): string;
  export function existsSync(path: string | URL): boolean;
  export function readFileSync(path: string | URL, encoding: "utf8"): string;
  export function writeFileSync(path: string | URL, data: string, encoding?: "utf8"): void;
}

declare module "node:os" {
  export function tmpdir(): string;
}

declare module "node:path" {
  export function join(...parts: string[]): string;
  export function relative(from: string, to: string): string;
  export function resolve(...parts: string[]): string;
}
