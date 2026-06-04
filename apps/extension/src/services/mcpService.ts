import type { FixResponse, GitHubPullRequestReviewResponse, ProjectHistoryResponse, ReviewResponse, ScanResponse, Severity } from "@goaegis/shared-types";

import { GoAegisMcpClient } from "@goaegis/mcp-client";

const client = new GoAegisMcpClient();

export async function runFileScan(path: string): Promise<ScanResponse> {
  return client.scan({
    projectId: "local-project",
    repositoryId: "local-repository",
    path
  });
}

export async function runFix(findingId: string, provider: "gemini" | "openai" | "anthropic" = "gemini"): Promise<FixResponse> {
  return client.fix({
    projectId: "local-project",
    findingId,
    provider
  });
}

export async function runFixForFinding(
  findingId: string,
  provider: "gemini" | "openai" | "anthropic" = "gemini"
): Promise<FixResponse> {
  return runFix(findingId, provider);
}

export async function runProjectScore(projectId: string): Promise<{ projectId: string; score: number; severity: Severity }> {
  return client.score(projectId);
}

export async function runProjectHistory(projectId: string): Promise<ProjectHistoryResponse> {
  return client.projectHistory(projectId);
}

export async function runCurrentFileReview(input: {
  projectId: string;
  repositoryId: string;
  path: string;
  title?: string;
  content?: string;
}): Promise<ReviewResponse> {
  return client.githubReview({
    projectId: input.projectId,
    repositoryId: input.repositoryId,
    source: "current-file",
    path: input.path,
    title: input.title,
    content: input.content
  });
}

export async function runGitHubPullRequestReview(input: {
  projectId: string;
  repositoryId: string;
  owner: string;
  repo: string;
  pullNumber: number;
  headSha?: string;
  baseSha?: string;
  path: string;
  title?: string;
  content?: string;
}): Promise<GitHubPullRequestReviewResponse> {
  return client.githubPullRequestReview({
    projectId: input.projectId,
    repositoryId: input.repositoryId,
    owner: input.owner,
    repo: input.repo,
    pullNumber: input.pullNumber,
    headSha: input.headSha,
    baseSha: input.baseSha,
    source: "pull-request",
    path: input.path,
    title: input.title,
    content: input.content
  });
}
