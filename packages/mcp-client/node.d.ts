declare const process: {
  env: Record<string, string | undefined>;
};

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

declare module "node:fs" {
  export function existsSync(path: string | URL): boolean;
}
