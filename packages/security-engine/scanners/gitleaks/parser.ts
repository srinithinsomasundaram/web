import type { Finding, Severity } from "@goaegis/shared-types";

export interface GitleaksFindingResult {
  Description?: string;
  StartLine?: number;
  EndLine?: number;
  File?: string;
  RuleID?: string;
  Fingerprint?: string;
  Secret?: string;
  Match?: string;
  Tags?: string[];
}

export type GitleaksReport = GitleaksFindingResult[];

function inferSeverity(tags?: string[]): Severity {
  const normalized = (tags ?? []).map((tag) => tag.toLowerCase());
  if (normalized.some((tag) => tag.includes("critical"))) {
    return "critical";
  }
  if (normalized.some((tag) => tag.includes("high"))) {
    return "high";
  }
  if (normalized.some((tag) => tag.includes("medium"))) {
    return "medium";
  }
  return "high";
}

function buildFingerprint(parts: Array<string | number | undefined>): string {
  return parts.filter((part) => part !== undefined && part !== "").join(":");
}

export function parseGitleaksReport(report: GitleaksReport, projectId: string, repositoryId: string): Finding[] {
  return report.map((result) => {
    const lineStart = result.StartLine;
    const lineEnd = result.EndLine ?? result.StartLine;
    const fingerprint =
      result.Fingerprint ?? buildFingerprint(["gitleaks", result.RuleID, result.File, lineStart, lineEnd]);

    return {
      id: `gitleaks:${fingerprint}`,
      projectId,
      repositoryId,
      scanner: "gitleaks",
      ruleId: result.RuleID ?? "gitleaks-rule",
      title: result.Description ?? result.RuleID ?? "Secret detected",
      description: result.Description ?? "Secret detected",
      severity: inferSeverity(result.Tags),
      filePath: result.File ?? "",
      lineStart,
      lineEnd,
      fingerprint,
      createdAt: new Date().toISOString()
    };
  });
}

