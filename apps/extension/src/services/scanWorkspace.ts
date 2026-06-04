import type { Finding, ScanResponse, Severity } from "@goaegis/shared-types";

import { runFileScan } from "./mcpService.js";

const severityOrder: Severity[] = ["low", "medium", "high", "critical"];

function calculateScore(findings: Finding[]): number {
  const penalty = findings.reduce((total, finding) => {
    switch (finding.severity) {
      case "low":
        return total + 5;
      case "medium":
        return total + 15;
      case "high":
        return total + 30;
      case "critical":
        return total + 60;
      default:
        return total + 15;
    }
  }, 0);

  return Math.max(0, 100 - penalty);
}

function getMaxSeverity(findings: Finding[]): Severity {
  return findings.reduce<Severity>((current, finding) => {
    return severityOrder.indexOf(finding.severity) > severityOrder.indexOf(current) ? finding.severity : current;
  }, "low");
}

function aggregateScans(folderResults: Array<{ folderUri: string; scan: ScanResponse }>): ScanResponse {
  const findings = folderResults.flatMap((result) => result.scan.findings ?? []);
  const projectId = folderResults[0]?.scan.summary.projectId ?? "workspace";
  const repositoryId = folderResults.map((result) => result.scan.summary.repositoryId).join(", ") || "workspace";

  return {
    scanId: folderResults.map((result) => result.scan.scanId).join("+"),
    summary: {
      projectId,
      repositoryId,
      totalFindings: findings.length,
      criticalFindings: findings.filter((finding) => finding.severity === "critical").length,
      highFindings: findings.filter((finding) => finding.severity === "high").length,
      score: calculateScore(findings)
    },
    maxSeverity: getMaxSeverity(findings),
    findings
  };
}

export interface WorkspaceScanResult {
  aggregate: ScanResponse;
  folderScans: Array<{ folderUri: string; scan: ScanResponse }>;
}

export async function scanWorkspaceFolders(workspaceFolders: Array<{ uri: { toString(): string } }>): Promise<WorkspaceScanResult> {
  const folderScans = [];

  for (const folder of workspaceFolders) {
    const folderUri = folder.uri.toString();
    const scan = await runFileScan(folderUri);
    folderScans.push({ folderUri, scan });
  }

  return {
    aggregate: aggregateScans(folderScans),
    folderScans
  };
}

