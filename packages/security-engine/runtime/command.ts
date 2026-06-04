import { spawnSync } from "node:child_process";

export interface CommandResult {
  stdout: string;
  stderr: string;
  exitCode: number | null;
}

export function runCommand(command: string, args: string[], cwd?: string): CommandResult {
  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024
  });

  if (result.error) {
    throw new Error(`Failed to start ${command}: ${result.error.message}`);
  }

  return {
    stdout: result.stdout,
    stderr: result.stderr,
    exitCode: result.status
  };
}

