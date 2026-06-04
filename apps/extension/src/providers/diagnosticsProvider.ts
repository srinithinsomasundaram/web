import * as vscode from "vscode";

export function createDiagnosticsCollection(): vscode.DiagnosticCollection {
  return vscode.languages.createDiagnosticCollection("goaegis");
}

