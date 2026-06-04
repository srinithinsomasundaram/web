import type { Finding, Severity } from "@goaegis/shared-types";

const severityWeights: Record<Severity, number> = {
  low: 5,
  medium: 15,
  high: 30,
  critical: 60
};

export function calculateSecurityScore(findings: Finding[]): number {
  const penalty = findings.reduce((total, finding) => total + severityWeights[finding.severity], 0);
  return Math.max(0, 100 - penalty);
}

export function getMaxSeverity(findings: Finding[]): Severity {
  const order: Severity[] = ["low", "medium", "high", "critical"];
  return findings.reduce<Severity>((current, finding) => {
    return order.indexOf(finding.severity) > order.indexOf(current) ? finding.severity : current;
  }, "low");
}

