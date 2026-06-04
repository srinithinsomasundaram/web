import * as vscode from "vscode";

import { runCurrentFileReview } from "./mcpService.js";

export async function reviewDocument(document: vscode.TextDocument): Promise<Awaited<ReturnType<typeof runCurrentFileReview>>> {
  return runCurrentFileReview({
    projectId: "local-project",
    repositoryId: "local-repository",
    path: document.uri.toString(),
    title: document.uri.toString(),
    content: document.getText()
  });
}
