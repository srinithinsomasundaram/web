import type { Severity } from "./findings.js";

export type ReviewSource = "current-file" | "pull-request";

export interface ReviewRequest {
  projectId: string;
  repositoryId: string;
  source?: ReviewSource;
  path?: string;
  title?: string;
  content?: string;
  diff?: string;
  provider?: "gemini" | "openai" | "anthropic";
}

export interface ReviewComment {
  path: string;
  line: number;
  severity: Severity;
  message: string;
  suggestion?: string;
}

export interface ReviewResponse {
  reviewId: string;
  projectId: string;
  repositoryId: string;
  source: ReviewSource;
  targetLabel: string;
  provider: string;
  score: number;
  severity: Severity;
  summary: string;
  topRisks: string[];
  recommendedImprovements: string[];
  architectureConcerns: string[];
  comments: ReviewComment[];
}

export interface GitHubPullRequestReviewRequest extends ReviewRequest {
  owner: string;
  repo: string;
  pullNumber: number;
  headSha?: string;
  baseSha?: string;
}

export interface GitHubPullRequestReviewResponse extends ReviewResponse {
  published: boolean;
  githubReviewId?: number;
  githubReviewUrl?: string;
  githubStatus: "published" | "skipped" | "failed";
  githubMessage?: string;
}
