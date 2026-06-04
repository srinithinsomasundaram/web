import * as vscode from "vscode";

import type { ReviewResponse } from "@goaegis/shared-types";

import { getLatestReview, subscribeToReviewState } from "../services/reviewState.js";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function commentCommandUri(comment: NonNullable<ReviewResponse["comments"]>[number]): string {
  return `command:goaegis.openFinding?${encodeURIComponent(JSON.stringify([comment.path, comment.line, comment.line]))}`;
}

function renderReview(review: ReviewResponse | undefined): string {
  const comments = review?.comments ?? [];
  const githubStatus = review && "githubStatus" in review ? String((review as { githubStatus?: string }).githubStatus ?? "") : "";
  const githubUrl = review && "githubReviewUrl" in review ? String((review as { githubReviewUrl?: string }).githubReviewUrl ?? "") : "";
  const githubMessage = review && "githubMessage" in review ? String((review as { githubMessage?: string }).githubMessage ?? "") : "";
  return `
    <!doctype html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style>
        :root {
          color-scheme: dark;
          --bg: #0b1020;
          --panel: rgba(12, 18, 36, 0.92);
          --panel-2: rgba(18, 26, 46, 0.96);
          --text: #ecf2ff;
          --muted: #94a3b8;
          --border: rgba(148, 163, 184, 0.18);
          --accent: #60a5fa;
          --high: #fb7185;
          --medium: #fbbf24;
        }
        body {
          margin: 0;
          font-family: Inter, ui-sans-serif, system-ui, sans-serif;
          background:
            radial-gradient(circle at top, rgba(96, 165, 250, 0.18), transparent 28%),
            linear-gradient(180deg, #0b1020 0%, #050816 100%);
          color: var(--text);
        }
        .wrap { padding: 16px; }
        .hero {
          border: 1px solid var(--border);
          border-radius: 20px;
          background: var(--panel);
          padding: 16px;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
        }
        .eyebrow {
          color: var(--muted);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .score {
          font-size: 52px;
          font-weight: 800;
          line-height: 1;
          margin: 8px 0 4px;
        }
        .subtitle {
          color: var(--muted);
          margin: 0 0 16px;
        }
        .section-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 18px 0 10px;
          font-size: 14px;
          font-weight: 700;
        }
        .list {
          display: grid;
          gap: 10px;
        }
        .chip {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 999px;
          color: #08111f;
          background: var(--accent);
        }
        .comment {
          border: 1px solid var(--border);
          border-radius: 16px;
          background: var(--panel-2);
          padding: 12px;
        }
        .comment-top,
        .comment-meta {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          flex-wrap: wrap;
          color: var(--muted);
          font-size: 12px;
        }
        .comment-title {
          color: var(--text);
          text-decoration: none;
          font-weight: 700;
        }
        .comment-title:hover {
          text-decoration: underline;
        }
        .comment p {
          margin: 8px 0 0;
          color: var(--muted);
          line-height: 1.45;
        }
        .sections {
          display: grid;
          gap: 10px;
        }
        .section-card {
          border: 1px solid var(--border);
          border-radius: 16px;
          background: rgba(15, 23, 42, 0.72);
          padding: 12px;
        }
        .section-card ul {
          margin: 8px 0 0 18px;
          color: var(--muted);
          line-height: 1.45;
        }
        .empty {
          border: 1px dashed var(--border);
          border-radius: 16px;
          padding: 18px;
          color: var(--muted);
          background: rgba(10, 16, 30, 0.5);
        }
        .severity-high { box-shadow: inset 0 0 0 1px rgba(251, 113, 133, 0.35); }
        .severity-medium { box-shadow: inset 0 0 0 1px rgba(251, 191, 36, 0.32); }
      </style>
    </head>
    <body>
      <div class="wrap">
        <section class="hero">
          <div class="eyebrow">GoAegis AI Review</div>
          <div class="score">${review?.score ?? 0}</div>
          <p class="subtitle">${
            review
              ? `${review.summary} Target: ${review.targetLabel}`
              : "Run GoAegis: Review Current File to generate GitHub-style review comments."
          }</p>
          ${
            githubStatus
              ? `<div class="section-card"><div class="section-title">GitHub Status</div><div>${escapeHtml(githubStatus)}</div>${githubMessage ? `<div>${escapeHtml(githubMessage)}</div>` : ""}${githubUrl ? `<div><a class="comment-title" href="${escapeHtml(githubUrl)}">Open GitHub review</a></div>` : ""}</div>`
              : ""
          }
          <div class="section-title">Top Risks</div>
          <div class="sections">
            <div class="section-card">${(review?.topRisks ?? []).map((risk) => `<div>${escapeHtml(risk)}</div>`).join("") || "None"}</div>
            <div class="section-card">
              <div class="section-title">Recommended Improvements</div>
              <ul>
                ${(review?.recommendedImprovements ?? []).map((item) => `<li>${escapeHtml(item)}</li>`).join("") || "<li>No additional improvements suggested.</li>"}
              </ul>
            </div>
            <div class="section-card">
              <div class="section-title">Architecture Concerns</div>
              <ul>
                ${(review?.architectureConcerns ?? []).map((item) => `<li>${escapeHtml(item)}</li>`).join("") || "<li>No architecture concerns flagged.</li>"}
              </ul>
            </div>
          </div>
          <div class="section-title">Comments</div>
          ${
            comments.length > 0
              ? `<div class="list">${comments
                  .map(
                    (comment) => `
                      <article class="comment severity-${comment.severity}">
                        <div class="comment-top">
                          <a class="comment-title" href="${commentCommandUri(comment)}">${escapeHtml(comment.path)}:${comment.line}</a>
                          <span class="chip">${escapeHtml(comment.severity.toUpperCase())}</span>
                        </div>
                        <p>${escapeHtml(comment.message)}</p>
                        ${
                          comment.suggestion
                            ? `<p><strong>Suggestion:</strong> ${escapeHtml(comment.suggestion)}</p>`
                            : ""
                        }
                      </article>
                    `
                  )
                  .join("")}</div>`
              : '<div class="empty">No review comments yet. Run the review command on a saved file or PR diff.</div>'
          }
        </section>
      </div>
    </body>
    </html>
  `;
}

export class ReviewPanelProvider {
  constructor(private readonly context: vscode.ExtensionContext) {
    void context;
  }

  resolveWebviewView(view: vscode.WebviewView): void {
    view.webview.options = {
      enableScripts: false,
      enableCommandUris: true
    };
    view.webview.html = renderReview(getLatestReview());

    const dispose = subscribeToReviewState((review) => {
      view.webview.html = renderReview(review);
    });

    view.onDidDispose?.(() => dispose());
  }
}
