import type { Finding } from "@goaegis/shared-types";

export function normalizeFindings(findings: Finding[]): Finding[] {
  return findings.map((finding) => ({
    ...finding,
    title: finding.title.trim(),
    description: finding.description.trim()
  }));
}

