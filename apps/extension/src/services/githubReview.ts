import * as vscode from "vscode";

import { detectGitHubWorkspaceContext } from "./githubContext.js";
import { runGitHubPullRequestReview } from "./mcpService.js";
import { setLatestReview } from "./reviewState.js";
import { trackTelemetryEvent } from "./telemetry.js";

export async function reviewCurrentPullRequest(
  context: vscode.ExtensionContext,
  document: vscode.TextDocument
): Promise<void> {
  await document.save();

  const detected = await detectGitHubWorkspaceContext(document);
  const owner = detected.owner ?? (await promptValue("GitHub owner", "e.g. my-org", detected.owner));
  if (!owner) {
    return;
  }

  const repo = detected.repo ?? (await promptValue("GitHub repository", "e.g. my-repo", detected.repo));
  if (!repo) {
    return;
  }

  let pullNumber = detected.pullNumber;
  if (!pullNumber || pullNumber <= 0) {
    const pullNumberValue = await promptValue("Pull request number", "e.g. 42", detected.pullNumber ? String(detected.pullNumber) : undefined);
    if (!pullNumberValue) {
      return;
    }

    pullNumber = Number.parseInt(pullNumberValue, 10);
    if (!Number.isFinite(pullNumber) || pullNumber <= 0) {
      vscode.window.showWarningMessage("GoAegis needs a valid pull request number.");
      return;
    }
  }

  const review = await runGitHubPullRequestReview({
    projectId: "local-project",
    repositoryId: "local-repository",
    owner,
    repo,
    pullNumber,
    headSha: detected.headSha || (await promptValue("Head SHA", "Optional, but needed for inline comments")) || undefined,
    baseSha: detected.baseSha || (await promptValue("Base SHA", "Optional")) || undefined,
    path: detected.relativePath ?? document.uri.fsPath,
    title: document.uri.toString(),
    content: document.getText()
  });
  setLatestReview(review);
  void trackTelemetryEvent(context, "review_generated", {
    mode: "pull-request",
    score: review.score,
    severity: review.severity,
    comments: review.comments.length,
    published: review.published
  }, "review-current-pr");

  if (review.published) {
    vscode.window.showInformationMessage(
      `GoAegis published ${review.comments.length} review comment(s) to GitHub.`
    );
    return;
  }

  vscode.window.showWarningMessage(
    review.githubMessage || "GoAegis generated a review but could not publish it to GitHub."
  );
}

async function promptValue(prompt: string, placeholder: string, value?: string): Promise<string | undefined> {
  return vscode.window.showInputBox({
    prompt,
    placeHolder: placeholder,
    value,
    ignoreFocusOut: true
  });
}
