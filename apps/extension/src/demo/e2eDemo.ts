import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { runFileScan, runFix } from "../services/mcpService.js";

export interface DemoFinding {
  id: string;
  title: string;
  filePath: string;
  severity: string;
}

export interface DemoResult {
  files: Array<{
    path: string;
    findings: DemoFinding[];
  }>;
  totalFindings: number;
  fix?: {
    findingId: string;
    provider: string;
    explanation: string;
    patch: string;
  };
}

export async function runEndToEndDemo(): Promise<DemoResult> {
  const workspace = mkdtempSync(join(tmpdir(), "goaegis-demo-"));
  const pythonFile = join(workspace, "vulnerable.py");
  const javascriptFile = join(workspace, "vulnerable.js");

  writeFileSync(pythonFile, readFixture("vulnerable.py"), "utf8");
  writeFileSync(javascriptFile, readFixture("vulnerable.js"), "utf8");

  const pythonScan = await runFileScan(`file://${pythonFile}`);
  const javascriptScan = await runFileScan(`file://${javascriptFile}`);
  const firstFinding = (pythonScan.findings ?? [])[0] ?? (javascriptScan.findings ?? [])[0];
  const fix = firstFinding
    ? await runFix(firstFinding.id, "gemini")
    : undefined;

  return {
    files: [
      {
        path: pythonFile,
        findings: (pythonScan.findings ?? []).map((finding) => ({
          id: finding.id,
          title: finding.title,
          filePath: finding.filePath,
          severity: finding.severity
        }))
      },
      {
        path: javascriptFile,
        findings: (javascriptScan.findings ?? []).map((finding) => ({
          id: finding.id,
          title: finding.title,
          filePath: finding.filePath,
          severity: finding.severity
        }))
      }
    ],
    totalFindings: (pythonScan.findings?.length ?? 0) + (javascriptScan.findings?.length ?? 0),
    fix: fix
      ? {
          findingId: fix.findingId,
          provider: "gemini",
          explanation: fix.explanation,
          patch: fix.patch
        }
      : undefined
  };
}

function readFixture(fileName: string): string {
  return readFileSync(join(process.cwd(), "apps/extension/test-fixtures", fileName), "utf8");
}
