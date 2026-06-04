import * as vscode from "vscode";

import { reviewDocument } from "../services/reviewDocument.js";
import { setLatestReview } from "../services/reviewState.js";
import { trackTelemetryEvent } from "../services/telemetry.js";

export function registerReviewCurrentFileCommand(context: vscode.ExtensionContext): vscode.Disposable {
  return vscode.commands.registerCommand("goaegis.reviewCurrentFile", async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage("GoAegis needs an open file to review.");
      return;
    }

    const document = editor.document;
    await document.save();

    const review = await reviewDocument(document);
    setLatestReview(review);
    void trackTelemetryEvent(context, "review_generated", {
      mode: "current-file",
      score: review.score,
      severity: review.severity,
      comments: review.comments.length,
      published: false
    }, "review-current-file");

    if (review.comments.length > 0) {
      vscode.window.showWarningMessage(`GoAegis generated ${review.comments.length} review comment(s).`);
      return;
    }

    vscode.window.showInformationMessage("GoAegis found no review comments.");
  });
}
