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

export type MCPToolName =
  | "securityScan"
  | "securityFix"
  | "secretScan"
  | "projectScore"
  | "projectHistory"
  | "githubReview"
  | "githubPullRequestReview"
  | "telemetryEvent";

export interface MCPToolResult {
  content: Array<{ type: "text"; text: string }>;
}

export interface MCPToolDefinition {
  name: MCPToolName;
  description: string;
}

export type MCPToolArgs =
  | ScanRequest
  | FixRequest
  | ReviewRequest
  | { projectId: string }
  | { projectId: string; score: number; severity: Severity }
  | Record<string, unknown>;

export interface MCPToolHandlerMap {
  securityScan: (input: ScanRequest) => Promise<ScanResponse>;
  securityFix: (input: FixRequest) => Promise<FixResponse>;
  secretScan: (projectId: string) => Promise<{ projectId: string; totalSecrets: number }>;
  projectScore: (projectId: string) => Promise<{ projectId: string; score: number; severity: Severity }>;
  projectHistory: (projectId: string) => Promise<ProjectHistoryResponse>;
  githubReview: (input: ReviewRequest) => Promise<ReviewResponse>;
  githubPullRequestReview: (input: GitHubPullRequestReviewRequest) => Promise<GitHubPullRequestReviewResponse>;
  telemetryEvent: (input: TelemetryEventRequest) => Promise<TelemetryEventResponse>;
}
