import type { Finding } from "@goaegis/shared-types";

import { createTempWorkspace, normalizeTargetPath, readTextFile } from "../../runtime/filesystem.js";
import { runCommand } from "../../runtime/command.js";
import { parseGitleaksReport, type GitleaksReport } from "./parser.js";

export interface GitleaksScanInput {
  projectId: string;
  repositoryId: string;
  path?: string;
  config?: string;
  cwd?: string;
}

export async function runGitleaksScan(input: GitleaksScanInput): Promise<Finding[]> {
  const targetPath = normalizeTargetPath(input.path);
  const workspace = createTempWorkspace("goaegis-gitleaks-");
  const reportPath = `${workspace.directory}/gitleaks.json`;

  try {
    const args = ["dir", "--report-format", "json", "--report-path", reportPath];

    if (input.config) {
      args.push("--config", input.config);
    }

    args.push(targetPath);

    const result = runCommand("gitleaks", args, input.cwd);

    if (result.exitCode !== 0 && result.exitCode !== 1) {
      throw new Error(result.stderr || `gitleaks exited with status ${result.exitCode}`);
    }

    const report = JSON.parse(readTextFile(reportPath)) as GitleaksReport;
    return parseGitleaksReport(report, input.projectId, input.repositoryId);
  } finally {
    workspace.cleanup();
  }
}
