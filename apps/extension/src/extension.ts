import * as vscode from "vscode";
import { resolve } from "node:path";

import { applyFix, registerFixCodeActions } from "./actions/fixVulnerabilityAction.js";
import { registerReviewCurrentFileCommand } from "./commands/reviewCurrentFile.js";
import {
  detectScannerAvailability,
  registerSaveAndScanCommand,
  setDiagnosticsCollection
} from "./commands/saveFileAndScan.js";
import { registerWorkspaceScanCommand, setWorkspaceDiagnosticsCollection } from "./commands/scanWorkspace.js";
import { publishSecurityDiagnostics } from "./diagnostics/securityDiagnostics.js";
import { reviewCurrentPullRequest } from "./services/githubReview.js";
import { scanDocument } from "./services/scanDocument.js";
import { setFindingsForDocument, setLatestProjectHistory, setLatestProjectScore, setLatestScan } from "./services/scanState.js";
import { trackTelemetryEvent } from "./services/telemetry.js";
import { ReviewPanelProvider } from "./views/ReviewPanel.js";
import { runProjectHistory, runProjectScore } from "./services/mcpService.js";
import { SecurityPanelProvider } from "./views/SecurityPanel.js";

export function activate(context: vscode.ExtensionContext): void {
  const diagnosticsCollection = vscode.languages.createDiagnosticCollection("goaegis");
  setDiagnosticsCollection(diagnosticsCollection);
  setWorkspaceDiagnosticsCollection(diagnosticsCollection);

  context.subscriptions.push(diagnosticsCollection);
  context.subscriptions.push(registerSaveAndScanCommand(context));
  context.subscriptions.push(registerWorkspaceScanCommand(context));

  const securityPanelProvider = new SecurityPanelProvider(context);
  const reviewPanelProvider = new ReviewPanelProvider(context);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("goaegis.securityPanel", securityPanelProvider)
  );
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("goaegis.reviewPanel", reviewPanelProvider)
  );
  detectScannerAvailability();
  context.subscriptions.push(registerFixCodeActions(context));
  context.subscriptions.push(registerReviewCurrentFileCommand(context));
  context.subscriptions.push(
    vscode.commands.registerCommand("goaegis.reviewCurrentPullRequest", async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showWarningMessage("GoAegis needs an open file to review.");
        return;
      }

      await reviewCurrentPullRequest(context, editor.document);
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("goaegis.openFinding", async (...args: unknown[]) => {
      const [filePath, lineStart, lineEnd] = args as [string, number | undefined, number | undefined];
      await openFinding(context, filePath, lineStart ?? 1, lineEnd ?? lineStart ?? 1);
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("goaegis.applyFix", async (...args: unknown[]) => {
      const [uriString, findingId] = args as [string, string];
      await applyFix(uriString, findingId);
      void trackTelemetryEvent(context, "fix_applied", {
        success: true
      }, "fix-vulnerability");
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("goaegis.installScanners", async () => {
      if (process.platform === "darwin") {
        const terminal = vscode.window.createTerminal("GoAegis Setup");
        terminal.show(true);
        terminal.sendText("brew install semgrep gitleaks");
        return;
      }

      vscode.window.showInformationMessage(
        "Install semgrep and gitleaks on your PATH, then rerun GoAegis. On macOS you can use: brew install semgrep gitleaks"
      );
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("goaegis.installBackendPrereqs", async () => {
      if (process.platform === "darwin") {
        const terminal = vscode.window.createTerminal("GoAegis Backend Setup");
        terminal.show(true);
        terminal.sendText("cd apps/api && python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt");
        return;
      }

      vscode.window.showInformationMessage(
        "Create a Python virtual environment in apps/api and install requirements.txt, then start the API. On macOS you can use: cd apps/api && python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt"
      );
    })
  );

  context.subscriptions.push(
    vscode.workspace.onDidSaveTextDocument(async (document) => {
      const result = await scanDocument(document.uri.toString());
      const persistedScore = await runProjectScore(result.summary.projectId);
      const persistedHistory = await runProjectHistory(result.summary.projectId);
      setLatestProjectScore(persistedScore);
      setLatestProjectHistory(persistedHistory);
      setLatestScan(result);
      setFindingsForDocument(document.uri.toString(), result);
      publishSecurityDiagnostics(diagnosticsCollection, document.uri, result.findings ?? []);
      void trackTelemetryEvent(context, "workspace_scan", {
        totalFindings: result.summary.totalFindings,
        criticalFindings: result.summary.criticalFindings,
        highFindings: result.summary.highFindings,
        score: result.summary.score,
        mode: "file"
      }, "save-file");
      if ((result.findings ?? []).length > 0) {
        vscode.window.showWarningMessage(`GoAegis found ${result.summary.totalFindings} issue(s).`);
      }
    })
  );

  void trackTelemetryEvent(context, "app_activated", {
    surface: "extension"
  });
}

export function deactivate(): void {
  // No-op.
}

async function openFinding(
  context: vscode.ExtensionContext,
  filePath: string,
  lineStart: number,
  lineEnd: number
): Promise<void> {
  const uri = vscode.Uri.file(resolveFindingPath(filePath));
  const document = await vscode.workspace.openTextDocument(uri);
  const start = Math.max(0, lineStart - 1);
  const end = Math.max(start, lineEnd - 1);
  await vscode.window.showTextDocument(document, {
    selection: new vscode.Range(new vscode.Position(start, 0), new vscode.Position(end, 0)),
    preview: false,
    preserveFocus: false
  });
  void trackTelemetryEvent(context, "finding_clicked", {
    path: filePath,
    lineStart,
    lineEnd
  }, "open-finding");
}

function resolveFindingPath(filePath: string): string {
  if (filePath.startsWith("file://")) {
    return decodeURIComponent(new URL(filePath).pathname);
  }

  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  if (workspaceFolder) {
    return resolve(workspaceFolder.uri.fsPath, filePath);
  }

  return resolve(filePath);
}
