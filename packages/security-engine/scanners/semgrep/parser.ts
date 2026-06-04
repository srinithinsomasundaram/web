import type { Finding, Severity } from "@goaegis/shared-types";

export interface SemgrepFindingResult {
  check_id: string;
  path: string;
  start?: {
    line?: number;
  };
  end?: {
    line?: number;
  };
  extra?: {
    fingerprint?: string;
    message?: string;
    severity?: string;
  };
}

export interface SemgrepReport {
  results?: SemgrepFindingResult[];
}

function mapSemgrepSeverity(value?: string): Severity {
  switch ((value ?? "").toLowerCase()) {
    case "info":
      return "low";
    case "warning":
      return "medium";
    case "error":
      return "high";
    case "critical":
      return "critical";
    default:
      return "medium";
  }
}

function buildFingerprint(parts: Array<string | number | undefined>): string {
  return parts.filter((part) => part !== undefined && part !== "").join(":");
}

export function parseSemgrepReport(report: SemgrepReport, projectId: string, repositoryId: string): Finding[] {
  return (report.results ?? []).map((result) => {
    const lineStart = result.start?.line;
    const lineEnd = result.end?.line ?? lineStart;
    const fingerprint =
      result.extra?.fingerprint ??
      buildFingerprint(["semgrep", result.check_id, result.path, lineStart, lineEnd]);

    return {
      id: `semgrep:${fingerprint}`,
      projectId,
      repositoryId,
      scanner: "semgrep",
      ruleId: result.check_id,
      title: result.extra?.message ?? result.check_id,
      description: result.extra?.message ?? result.check_id,
      severity: mapSemgrepSeverity(result.extra?.severity),
      filePath: result.path,
      lineStart,
      lineEnd,
      fingerprint,
      createdAt: new Date().toISOString()
    };
  });
}

