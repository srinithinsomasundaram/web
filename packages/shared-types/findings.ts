export type Severity = "low" | "medium" | "high" | "critical";

export interface Finding {
  id: string;
  projectId: string;
  repositoryId: string;
  scanner: "semgrep" | "gitleaks" | "custom";
  ruleId: string;
  title: string;
  description: string;
  severity: Severity;
  filePath: string;
  lineStart?: number;
  lineEnd?: number;
  fingerprint: string;
  createdAt: string;
}

