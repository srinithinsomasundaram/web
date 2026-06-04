import * as vscode from "vscode";

import type { Finding } from "@goaegis/shared-types";

function severityToDiagnosticSeverity(severity: Finding["severity"]): vscode.DiagnosticSeverity {
  switch (severity) {
    case "critical":
    case "high":
      return vscode.DiagnosticSeverity.Error;
    case "medium":
      return vscode.DiagnosticSeverity.Warning;
    case "low":
    default:
      return vscode.DiagnosticSeverity.Information;
  }
}

export function publishSecurityDiagnostics(
  collection: vscode.DiagnosticCollection,
  uri: { toString(): string },
  findings: Finding[]
): void {
  const diagnostics = findings.map((finding) => {
    const lineStart = Math.max(0, (finding.lineStart ?? 1) - 1);
    const lineEnd = Math.max(0, (finding.lineEnd ?? finding.lineStart ?? 1) - 1);
    const start = new vscode.Position(lineStart, 0);
    const end = new vscode.Position(lineEnd, 0);
    return {
      range: new vscode.Range(start, end),
      message: `${finding.title}: ${finding.description} [${finding.id}]`,
      severity: severityToDiagnosticSeverity(finding.severity),
      source: "GoAegis"
    };
  });

  collection.set(uri, diagnostics);
}
