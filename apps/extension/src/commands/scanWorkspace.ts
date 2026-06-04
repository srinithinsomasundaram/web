import * as vscode from "vscode";

import { publishSecurityDiagnostics } from "../diagnostics/securityDiagnostics.js";
import {
  setLatestProjectHistory,
  setLatestProjectScore,
  setLatestScan,
  setLatestScanError
} from "../services/scanState.js";
import { scanWorkspaceFolders } from "../services/scanWorkspace.js";
import { runProjectHistory } from "../services/mcpService.js";
import { trackTelemetryEvent } from "../services/telemetry.js";

let diagnosticsCollection: vscode.DiagnosticCollection | undefined;

export function setWorkspaceDiagnosticsCollection(collection: vscode.DiagnosticCollection): void {
  diagnosticsCollection = collection;
}

export function registerWorkspaceScanCommand(context: vscode.ExtensionContext): vscode.Disposable {
  return vscode.commands.registerCommand("goaegis.scanWorkspace", async () => {
    console.log("GOAEGIS SCAN TRIGGERED: scanWorkspace");
    try {
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders || workspaceFolders.length === 0) {
        console.log("GOAEGIS SCAN ABORTED: no workspace folders");
        vscode.window.showWarningMessage("GoAegis needs an open workspace to scan.");
        return;
      }

      const result = await scanWorkspaceFolders(workspaceFolders);
      diagnosticsCollection?.clear();
      setLatestScan(result.aggregate);
      const persistedHistory = await runProjectHistory(result.aggregate.summary.projectId);
      setLatestProjectScore({
        projectId: result.aggregate.summary.projectId,
        score: result.aggregate.summary.score,
        severity: result.aggregate.maxSeverity
      });
      setLatestProjectHistory(persistedHistory);

      if (diagnosticsCollection) {
        for (const folderScan of result.folderScans) {
          publishSecurityDiagnostics(
            diagnosticsCollection,
            { toString: () => folderScan.folderUri },
            folderScan.scan.findings ?? []
          );
        }
      }

      if (result.aggregate.summary.totalFindings > 0) {
        vscode.window.showWarningMessage(`GoAegis found ${result.aggregate.summary.totalFindings} issue(s) in the workspace.`);
        void trackTelemetryEvent(context, "workspace_scan", {
          totalFindings: result.aggregate.summary.totalFindings,
          criticalFindings: result.aggregate.summary.criticalFindings,
          highFindings: result.aggregate.summary.highFindings,
          score: result.aggregate.summary.score,
          mode: "workspace"
        }, "workspace-scan");
        return;
      }

      vscode.window.showInformationMessage("GoAegis found no issues in the workspace.");
      void trackTelemetryEvent(context, "workspace_scan", {
        totalFindings: result.aggregate.summary.totalFindings,
        criticalFindings: result.aggregate.summary.criticalFindings,
        highFindings: result.aggregate.summary.highFindings,
        score: result.aggregate.summary.score,
        mode: "workspace"
      }, "workspace-scan");
    } catch (error) {
      console.error("GOAEGIS SCAN FAILED: scanWorkspace", error);
      const message = error instanceof Error ? error.message : String(error);
      const lower = message.toLowerCase();
      if (lower.includes("semgrep") || lower.includes("gitleaks")) {
        setLatestScanError(`Scanner missing: ${message}`);
      }
      vscode.window.showWarningMessage(`GoAegis scan failed: ${message}`);
    }
  });
}
