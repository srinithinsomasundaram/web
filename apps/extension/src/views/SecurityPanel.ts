import * as vscode from "vscode";

import type { ScanResponse } from "@goaegis/shared-types";

import { getLatestProjectHistory } from "../services/scanState.js";
import {
  getLatestProjectScore,
  getLatestScan,
  getLatestScanError,
  subscribeToScanError,
  subscribeToScanState
} from "../services/scanState.js";

function severityClass(severity: string): string {
  return `severity-${severity}`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function findingCommandUri(finding: NonNullable<ScanResponse["findings"]>[number]): string {
  const args = [finding.filePath, finding.lineStart ?? 1, finding.lineEnd ?? finding.lineStart ?? 1];
  return `command:goaegis.openFinding?${encodeURIComponent(JSON.stringify(args))}`;
}

function installScannersCommandUri(): string {
  return "command:goaegis.installScanners";
}

function installBackendPrereqsCommandUri(): string {
  return "command:goaegis.installBackendPrereqs";
}

function renderPanel(scan: ScanResponse | undefined): string {
  const summary = scan?.summary;
  const persistedScore = getLatestProjectScore();
  const history = getLatestProjectHistory()?.history ?? [];
  const findings = scan?.findings ?? [];
  const scanError = getLatestScanError();
  const grouped = {
    critical: findings.filter((finding) => finding.severity === "critical"),
    high: findings.filter((finding) => finding.severity === "high"),
    medium: findings.filter((finding) => finding.severity === "medium")
  };

  const findingCards = findings
    .map(
      (finding) => `
        <article class="finding-card ${severityClass(finding.severity)}">
          <div class="finding-top">
            <span class="finding-severity">${escapeHtml(finding.severity.toUpperCase())}</span>
            <a class="finding-file" href="${findingCommandUri(finding)}">${escapeHtml(finding.filePath)}</a>
          </div>
          <h3><a class="finding-title-link" href="${findingCommandUri(finding)}">${escapeHtml(finding.title)}</a></h3>
          <p>${escapeHtml(finding.description)}</p>
          <div class="finding-meta">
            <span>Rule: ${escapeHtml(finding.ruleId)}</span>
            <span>Line: ${finding.lineStart ?? 1}</span>
          </div>
        </article>
      `
    )
    .join("");

  const recentHistory = history.slice(-8);
  const trendMax = Math.max(100, ...recentHistory.map((item) => item.score));
  const trendBars = recentHistory
    .map(
      (item) => `
        <div class="trend-bar-wrap">
          <div class="trend-bar" style="height:${Math.max(8, Math.round((item.score / trendMax) * 100))}%"></div>
          <div class="trend-label">${escapeHtml(item.scanType)}</div>
          <div class="trend-score">${item.score}</div>
        </div>
      `
    )
    .join("");

  const historyRows = recentHistory
    .slice()
    .reverse()
    .map(
      (item) => `
        <div class="history-row">
          <span>${escapeHtml(item.scanType)}</span>
          <span class="history-score">${item.score}</span>
          <span class="history-meta">${escapeHtml(item.createdAt)}</span>
        </div>
      `
    )
    .join("");

  return `
    <!doctype html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style>
        :root {
          color-scheme: dark;
          --bg: #0b1220;
          --panel: rgba(10, 16, 30, 0.88);
          --panel-2: rgba(17, 24, 39, 0.94);
          --text: #e5eefb;
          --muted: #8ca0bf;
          --border: rgba(148, 163, 184, 0.18);
          --accent: #38bdf8;
          --critical: #fb7185;
          --high: #f97316;
          --medium: #fbbf24;
          --low: #22c55e;
        }
        body {
          margin: 0;
          font-family: Inter, ui-sans-serif, system-ui, sans-serif;
          background:
            radial-gradient(circle at top, rgba(56, 189, 248, 0.18), transparent 30%),
            linear-gradient(180deg, #0b1220 0%, #050816 100%);
          color: var(--text);
        }
        .wrap {
          padding: 16px;
        }
        .hero {
          border: 1px solid var(--border);
          background: var(--panel);
          border-radius: 20px;
          padding: 16px;
          backdrop-filter: blur(18px);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.3);
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
        .alert {
          border: 1px solid rgba(251, 191, 36, 0.35);
          background: rgba(69, 26, 3, 0.55);
          color: #fde68a;
          border-radius: 16px;
          padding: 12px 14px;
          margin-bottom: 14px;
          line-height: 1.4;
        }
        .alert strong {
          display: block;
          margin-bottom: 4px;
        }
        .alert-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 10px;
        }
        .alert-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px 12px;
          border-radius: 999px;
          background: #f59e0b;
          color: #111827;
          text-decoration: none;
          font-weight: 700;
          font-size: 12px;
        }
        .alert-button.secondary {
          background: transparent;
          color: #fde68a;
          border: 1px solid rgba(253, 230, 138, 0.35);
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          margin-bottom: 16px;
        }
        .stat {
          background: var(--panel-2);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 12px;
        }
        .stat-label {
          color: var(--muted);
          font-size: 12px;
          margin-bottom: 6px;
        }
        .stat-value {
          font-size: 24px;
          font-weight: 700;
        }
        .section-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 18px 0 10px;
          color: var(--text);
          font-size: 14px;
          font-weight: 700;
        }
        .severity-list {
          display: grid;
          gap: 8px;
          margin-bottom: 18px;
        }
        .trend {
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 14px;
          background: rgba(15, 23, 42, 0.72);
          margin-bottom: 18px;
        }
        .trend-chart {
          display: grid;
          grid-template-columns: repeat(${Math.max(1, recentHistory.length || 1)}, minmax(0, 1fr));
          gap: 8px;
          align-items: end;
          min-height: 140px;
          padding-top: 8px;
        }
        .trend-bar-wrap {
          display: grid;
          gap: 6px;
          align-items: end;
          justify-items: center;
          height: 140px;
        }
        .trend-bar {
          width: 100%;
          min-height: 8px;
          border-radius: 12px 12px 4px 4px;
          background: linear-gradient(180deg, var(--accent), #1d4ed8);
          align-self: end;
        }
        .trend-label,
        .trend-score,
        .history-meta {
          color: var(--muted);
          font-size: 11px;
          text-align: center;
        }
        .history-list {
          display: grid;
          gap: 8px;
          margin-top: 12px;
        }
        .history-row {
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 10px 12px;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 4px 10px;
          background: rgba(10, 16, 30, 0.72);
        }
        .history-score {
          font-weight: 700;
          color: var(--text);
        }
        .severity-row {
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 10px 12px;
          display: flex;
          justify-content: space-between;
          background: rgba(15, 23, 42, 0.75);
        }
        .badge {
          font-size: 11px;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 999px;
          color: #08111f;
        }
        .badge.critical { background: var(--critical); }
        .badge.high { background: var(--high); }
        .badge.medium { background: var(--medium); }
        .badge.low { background: var(--low); }
        .findings {
          display: grid;
          gap: 12px;
        }
        .finding-card {
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 14px;
          background: rgba(10, 16, 30, 0.82);
        }
        .finding-card h3 {
          margin: 8px 0 6px;
          font-size: 15px;
        }
        .finding-title-link,
        .finding-file {
          color: var(--text);
          text-decoration: none;
        }
        .finding-title-link:hover,
        .finding-file:hover {
          text-decoration: underline;
        }
        .finding-card p {
          margin: 0;
          color: var(--muted);
          line-height: 1.4;
        }
        .finding-top,
        .finding-meta {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          flex-wrap: wrap;
          color: var(--muted);
          font-size: 12px;
        }
        .finding-severity {
          color: var(--accent);
          font-weight: 700;
        }
        .severity-critical { box-shadow: inset 0 0 0 1px rgba(251, 113, 133, 0.35); }
        .severity-high { box-shadow: inset 0 0 0 1px rgba(249, 115, 22, 0.35); }
        .severity-medium { box-shadow: inset 0 0 0 1px rgba(251, 191, 36, 0.32); }
        .empty {
          border: 1px dashed var(--border);
          border-radius: 18px;
          padding: 18px;
          color: var(--muted);
          background: rgba(10, 16, 30, 0.5);
        }
      </style>
    </head>
    <body>
      <div class="wrap">
        <section class="hero">
          <div class="eyebrow">GoAegis Security Score</div>
          ${
            scanError
              ? `<div class="alert"><strong>Scanner unavailable</strong>${escapeHtml(scanError)}<div class="alert-actions"><a class="alert-button" href="${installScannersCommandUri()}">Install scanners</a><a class="alert-button secondary" href="${installBackendPrereqsCommandUri()}">Install backend prereqs</a></div></div>`
              : ""
          }
          <div class="score">${persistedScore?.score ?? summary?.score ?? 0}</div>
          <p class="subtitle">${
            persistedScore
              ? `Persisted project score for ${persistedScore.projectId}`
              : summary
                ? `${summary.totalFindings} findings across ${summary.repositoryId}`
                : "Save a file to populate findings."
          }</p>
          <div class="grid">
            <div class="stat">
              <div class="stat-label">Critical</div>
              <div class="stat-value">${summary?.criticalFindings ?? 0}</div>
            </div>
            <div class="stat">
              <div class="stat-label">High</div>
              <div class="stat-value">${summary?.highFindings ?? 0}</div>
            </div>
          </div>
          <div class="section-title">Score Trend</div>
          <div class="trend">
            ${
              recentHistory.length > 0
                ? `<div class="trend-chart">${trendBars}</div>`
                : '<div class="empty">No scan history yet. Run a scan to start the trend line.</div>'
            }
          </div>
          <div class="section-title">Persisted Score</div>
          <div class="severity-list">
            <div class="severity-row">
              <span>API Score</span>
              <span class="badge ${persistedScore?.severity ?? "low"}">${persistedScore?.score ?? summary?.score ?? 0}</span>
            </div>
          </div>
          <div class="section-title">Scan History</div>
          ${
            recentHistory.length > 0
              ? `<div class="history-list">${historyRows}</div>`
              : '<div class="empty">History will appear here after each scan.</div>'
          }
          <div class="section-title">Severity Breakdown</div>
          <div class="severity-list">
            <div class="severity-row"><span>Critical</span><span class="badge critical">${grouped.critical.length}</span></div>
            <div class="severity-row"><span>High</span><span class="badge high">${grouped.high.length}</span></div>
            <div class="severity-row"><span>Medium</span><span class="badge medium">${grouped.medium.length}</span></div>
          </div>
          <div class="section-title">Findings</div>
          ${
            findings.length > 0
              ? `<div class="findings">${findingCards}</div>`
              : '<div class="empty">No findings yet. Save a vulnerable file to populate the panel.</div>'
          }
        </section>
      </div>
    </body>
    </html>
  `;
}

export class SecurityPanelProvider {
  constructor(private readonly context: vscode.ExtensionContext) {
    void context;
  }

  resolveWebviewView(view: vscode.WebviewView): void {
    view.webview.options = {
      enableScripts: false,
      enableCommandUris: true
    };
    view.webview.html = renderPanel(getLatestScan());

    const dispose = subscribeToScanState((scan) => {
      view.webview.html = renderPanel(scan);
    });
    const disposeError = subscribeToScanError(() => {
      view.webview.html = renderPanel(getLatestScan());
    });

    view.onDidDispose?.(() => {
      dispose();
      disposeError();
    });
  }
}
