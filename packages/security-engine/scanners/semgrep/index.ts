import type { Finding } from "@goaegis/shared-types";

import { createTempWorkspace, normalizeTargetPath, readTextFile } from "../../runtime/filesystem.js";
import { runCommand } from "../../runtime/command.js";
import { parseSemgrepReport, type SemgrepReport } from "./parser.js";

export interface SemgrepScanInput {
  projectId: string;
  repositoryId: string;
  path?: string;
  config?: string;
  cwd?: string;
}

export async function runSemgrepScan(input: SemgrepScanInput): Promise<Finding[]> {
  const targetPath = normalizeTargetPath(input.path);
  const workspace = createTempWorkspace("goaegis-semgrep-");
  const reportPath = `${workspace.directory}/semgrep.json`;

  try {
    const args = [
      "scan",
      "--json",
      "--quiet",
      "--config",
      input.config ?? "auto",
      "--json-output",
      reportPath,
      targetPath
    ];

    const result = runCommand("semgrep", args, input.cwd);

    if (result.exitCode !== 0 && result.exitCode !== 1) {
      throw new Error(result.stderr || `semgrep exited with status ${result.exitCode}`);
    }

    const report = JSON.parse(readTextFile(reportPath)) as SemgrepReport;
    return parseSemgrepReport(report, input.projectId, input.repositoryId);
  } finally {
    workspace.cleanup();
  }
}
