import * as vscode from "vscode";
import { spawnSync } from "node:child_process";

import { publishSecurityDiagnostics } from "../diagnostics/securityDiagnostics.js";
import {
  setFindingsForDocument,
  setLatestProjectHistory,
  setLatestProjectScore,
  setLatestScan,
  setLatestScanError
} from "../services/scanState.js";
import { scanDocument } from "../services/scanDocument.js";
import { runProjectHistory, runProjectScore } from "../services/mcpService.js";
import { trackTelemetryEvent } from "../services/telemetry.js";

let diagnosticsCollection: vscode.DiagnosticCollection | undefined;

export function setDiagnosticsCollection(collection: vscode.DiagnosticCollection): void {
  diagnosticsCollection = collection;
}

export function registerSaveAndScanCommand(context: vscode.ExtensionContext): vscode.Disposable {
  return vscode.commands.registerCommand("goaegis.saveAndScan", async () => {
    console.log("GOAEGIS SCAN TRIGGERED: saveAndScan");
    try {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        console.log("GOAEGIS SCAN ABORTED: no active editor");
        return;
      }

      const document = editor.document;
      await document.save();

      const result = await scanDocument(document.uri.toString());
      const projectId = result.summary.projectId;
      const persistedScore = await runProjectScore(projectId);
      const persistedHistory = await runProjectHistory(projectId);
      setLatestProjectScore(persistedScore);
      setLatestProjectHistory(persistedHistory);
      setLatestScan(result);
      setFindingsForDocument(document.uri.toString(), result);
      const findings = result.findings ?? [];
      if (diagnosticsCollection) {
        publishSecurityDiagnostics(diagnosticsCollection, document.uri, findings);
      }

      void trackTelemetryEvent(context, "workspace_scan", {
        totalFindings: result.summary.totalFindings,
        criticalFindings: result.summary.criticalFindings,
        highFindings: result.summary.highFindings,
        score: result.summary.score,
        mode: "file"
      }, "save-file");

      if (result.summary.totalFindings > 0) {
        vscode.window.showWarningMessage(`GoAegis found ${result.summary.totalFindings} issue(s).`);
        return;
      }

      vscode.window.showInformationMessage("GoAegis found no issues.");
    } catch (error) {
      console.error("GOAEGIS SCAN FAILED: saveAndScan", error);
      const message = error instanceof Error ? error.message : String(error);
      setLatestScanError(normalizeScannerFailure(message));
      vscode.window.showWarningMessage(`GoAegis scan failed: ${message}`);
    }
  });
}

export function detectScannerAvailability(): void {
  const missing: string[] = [];
  if (!hasCommand("semgrep")) {
    missing.push("semgrep");
  }
  if (!hasCommand("gitleaks")) {
    missing.push("gitleaks");
  }

  if (missing.length > 0) {
    setLatestScanError(`Scanner missing: ${missing.join(", ")}. Install it and rerun the scan.`);
  }
}

function hasCommand(command: string): boolean {
  const result = spawnSync(command, ["--version"], { encoding: "utf8" });
  return !result.error && result.status === 0;
}

function normalizeScannerFailure(message: string): string | undefined {
  const lower = message.toLowerCase();
  if (lower.includes("semgrep") || lower.includes("gitleaks")) {
    return `Scanner missing: ${message}`;
  }
  return undefined;
}
