import { githubPullRequestReview } from "./tools/githubPullRequestReview.js";
import { githubReview } from "./tools/githubReview.js";
import { projectHistory } from "./tools/projectHistory.js";
import { projectScore } from "./tools/projectScore.js";
import { secretScan } from "./tools/secretScan.js";
import { securityFix } from "./tools/securityFix.js";
import { securityScan } from "./tools/securityScan.js";
import { telemetryEvent } from "./tools/telemetryEvent.js";
import type { MCPToolDefinition, MCPToolHandlerMap, MCPToolName, MCPToolResult } from "./types.js";
import type { ReviewSource } from "@goaegis/shared-types";

function normalizeProvider(value: unknown): "gemini" | "openai" | "anthropic" | undefined {
  if (value === "gemini" || value === "openai" || value === "anthropic") {
    return value;
  }

  return undefined;
}

function normalizeReviewSource(value: unknown): ReviewSource | undefined {
  if (value === "current-file" || value === "pull-request") {
    return value;
  }

  return undefined;
}

const toolHandlers: MCPToolHandlerMap = {
  securityScan,
  securityFix,
  secretScan,
  projectScore,
  projectHistory,
  githubReview,
  githubPullRequestReview,
  telemetryEvent
};

export const toolDefinitions: MCPToolDefinition[] = [
  {
    name: "securityScan",
    description: "Run a repository security scan through the GoAegis API."
  },
  {
    name: "securityFix",
    description: "Request a remediation patch for a finding through the GoAegis API."
  },
  {
    name: "secretScan",
    description: "Run a secrets-only scan through the GoAegis API."
  },
  {
    name: "projectScore",
    description: "Get a project security score through the GoAegis API."
  },
  {
    name: "projectHistory",
    description: "Get recent security scan history through the GoAegis API."
  },
  {
    name: "githubReview",
    description: "Generate GitHub-style PR review comments through the GoAegis API."
  },
  {
    name: "githubPullRequestReview",
    description: "Post a GoAegis review directly to a GitHub pull request."
  },
  {
    name: "telemetryEvent",
    description: "Submit an anonymous product telemetry event through the GoAegis API."
  }
];

function toTextResult(payload: unknown): MCPToolResult {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(payload, null, 2)
      }
    ]
  };
}

function assertObject(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Tool arguments must be an object.");
  }

  return value as Record<string, unknown>;
}

export async function invokeTool(name: MCPToolName, args: unknown): Promise<MCPToolResult> {
  switch (name) {
    case "securityScan": {
      const input = assertObject(args);
      const response = await toolHandlers.securityScan({
        projectId: String(input.projectId ?? ""),
        repositoryId: String(input.repositoryId ?? ""),
        path: typeof input.path === "string" ? input.path : undefined,
        ref: typeof input.ref === "string" ? input.ref : undefined
      });
      return toTextResult(response);
    }
    case "securityFix": {
      const input = assertObject(args);
      const response = await toolHandlers.securityFix({
        projectId: String(input.projectId ?? ""),
        findingId: String(input.findingId ?? ""),
        provider: normalizeProvider(input.provider)
      });
      return toTextResult(response);
    }
    case "secretScan": {
      const input = assertObject(args);
      const response = await toolHandlers.secretScan(String(input.projectId ?? ""));
      return toTextResult(response);
    }
    case "projectScore": {
      const input = assertObject(args);
      const response = await toolHandlers.projectScore(String(input.projectId ?? ""));
      return toTextResult(response);
    }
    case "projectHistory": {
      const input = assertObject(args);
      const response = await toolHandlers.projectHistory(String(input.projectId ?? ""));
      return toTextResult(response);
    }
    case "githubReview": {
      const input = assertObject(args);
      const response = await toolHandlers.githubReview({
        projectId: String(input.projectId ?? ""),
        repositoryId: String(input.repositoryId ?? ""),
        source: normalizeReviewSource(input.source) ?? "current-file",
        path: typeof input.path === "string" ? input.path : undefined,
        title: typeof input.title === "string" ? input.title : undefined,
        content: typeof input.content === "string" ? input.content : undefined,
        diff: typeof input.diff === "string" ? input.diff : undefined,
        provider: normalizeProvider(input.provider)
      });
      return toTextResult(response);
    }
    case "githubPullRequestReview": {
      const input = assertObject(args);
      const response = await toolHandlers.githubPullRequestReview({
        projectId: String(input.projectId ?? ""),
        repositoryId: String(input.repositoryId ?? ""),
        owner: String(input.owner ?? ""),
        repo: String(input.repo ?? ""),
        pullNumber: Number(input.pullNumber ?? 0),
        headSha: typeof input.headSha === "string" ? input.headSha : undefined,
        baseSha: typeof input.baseSha === "string" ? input.baseSha : undefined,
        source: normalizeReviewSource(input.source) ?? "pull-request",
        path: typeof input.path === "string" ? input.path : undefined,
        title: typeof input.title === "string" ? input.title : undefined,
        content: typeof input.content === "string" ? input.content : undefined,
        diff: typeof input.diff === "string" ? input.diff : undefined,
        provider: normalizeProvider(input.provider)
      });
      return toTextResult(response);
    }
    case "telemetryEvent": {
      const input = assertObject(args);
      const response = await toolHandlers.telemetryEvent({
        anonymousId: String(input.anonymousId ?? ""),
        eventName: String(input.eventName ?? "feature_used") as
          | "app_activated"
          | "scan_completed"
          | "workspace_scan"
          | "review_completed"
          | "review_generated"
          | "review_published"
          | "fix_applied"
          | "finding_clicked"
          | "feature_used",
        source: typeof input.source === "string" ? input.source : undefined,
        properties:
          input.properties && typeof input.properties === "object" && !Array.isArray(input.properties)
            ? (input.properties as Record<string, string | number | boolean | null | undefined>)
            : undefined
      });
      return toTextResult(response);
    }
    default:
      throw new Error(`Unknown tool: ${String(name)}`);
  }
}
