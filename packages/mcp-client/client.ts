import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";

import type {
  FixRequest,
  FixResponse,
  GitHubPullRequestReviewRequest,
  GitHubPullRequestReviewResponse,
  ProjectHistoryResponse,
  ReviewRequest,
  ReviewResponse,
  ScanRequest,
  ScanResponse,
  TelemetryEventRequest,
  TelemetryEventResponse,
  Severity
} from "@goaegis/shared-types";

export interface GoAegisMcpClientOptions {
  serverEntryPoint?: string;
  nodeBinary?: string;
}

export function resolveServerEntryPoint(baseUrl: string = import.meta.url): string {
  return decodeURIComponent(new URL("../../apps/mcp-server/src/main.ts", baseUrl).pathname);
}

export function resolveBuiltServerEntryPoint(baseUrl: string = import.meta.url): string {
  return decodeURIComponent(new URL("../../../../apps/mcp-server/dist/apps/mcp-server/src/main.js", baseUrl).pathname);
}

export function resolveRepoRoot(baseUrl: string = import.meta.url): string {
  return decodeURIComponent(new URL("../../../../", baseUrl).pathname);
}

export class GoAegisMcpClient {
  private readonly serverEntryPoint: string;
  private readonly nodeBinary: string;
  private readonly repoRoot: string;

  constructor(options: GoAegisMcpClientOptions = {}) {
    this.serverEntryPoint = options.serverEntryPoint ?? resolveBuiltServerEntryPoint();
    this.nodeBinary = options.nodeBinary ?? "node";
    this.repoRoot = resolveRepoRoot();
  }

  async scan(payload: ScanRequest): Promise<ScanResponse> {
    return this.request<ScanResponse>("securityScan", payload);
  }

  async fix(payload: FixRequest): Promise<FixResponse> {
    return this.request<FixResponse>("securityFix", payload);
  }

  async githubReview(payload: ReviewRequest): Promise<ReviewResponse> {
    return this.request<ReviewResponse>("githubReview", payload);
  }

  async githubPullRequestReview(
    payload: GitHubPullRequestReviewRequest
  ): Promise<GitHubPullRequestReviewResponse> {
    return this.request<GitHubPullRequestReviewResponse>("githubPullRequestReview", payload);
  }

  async secrets(projectId: string): Promise<{ projectId: string; totalSecrets: number }> {
    return this.request("secretScan", { projectId });
  }

  async score(projectId: string): Promise<{ projectId: string; score: number; severity: Severity }> {
    return this.request("projectScore", { projectId });
  }

  async projectHistory(projectId: string): Promise<ProjectHistoryResponse> {
    return this.request("projectHistory", { projectId });
  }

  async telemetryEvent(payload: TelemetryEventRequest): Promise<TelemetryEventResponse> {
    return this.request<TelemetryEventResponse>("telemetryEvent", payload);
  }

  private async request<T>(tool: string, payload: unknown): Promise<T> {
    this.ensureServerBuilt();
    const result = spawnSync(
      this.nodeBinary,
      [this.serverEntryPoint, "--tool", tool, "--args", JSON.stringify(payload)],
      {
        encoding: "utf8",
        maxBuffer: 20 * 1024 * 1024,
      }
    );

    if (result.error) {
      throw new Error(`MCP transport failed: ${result.error.message}`);
    }
    if (result.status !== 0) {
      const message = result.stderr.trim() || result.stdout.trim() || `MCP exited with ${result.status}`;
      throw new Error(message);
    }

    const output = result.stdout.trim();
    if (!output) {
      throw new Error("MCP transport returned no output.");
    }

    const payloadResult = JSON.parse(output) as { content?: Array<{ type: string; text: string }> };
    const textContent = payloadResult.content?.find((item) => item.type === "text");
    if (!textContent) {
      throw new Error("MCP transport returned no text content.");
    }

    return JSON.parse(textContent.text) as T;
  }

  private ensureServerBuilt(): void {
    if (existsSync(this.serverEntryPoint)) {
      return;
    }

    const build = spawnSync(
      "npm",
      ["run", "build", "--workspace", "@goaegis/mcp-server"],
      {
        encoding: "utf8",
        maxBuffer: 20 * 1024 * 1024,
        cwd: this.repoRoot,
      }
    );

    if (build.error) {
      throw new Error(`MCP server build failed: ${build.error.message}`);
    }
    if (build.status !== 0) {
      const message = build.stderr.trim() || build.stdout.trim() || `MCP server build exited with ${build.status}`;
      throw new Error(message);
    }

    if (!existsSync(this.serverEntryPoint)) {
      throw new Error(`MCP server build completed but ${this.serverEntryPoint} was not created.`);
    }
  }
}
