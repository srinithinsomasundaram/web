import type { GitHubPullRequestReviewRequest, GitHubPullRequestReviewResponse } from "@goaegis/shared-types";

import { apiClient } from "../clients/apiClient.js";

export async function githubPullRequestReview(
  input: GitHubPullRequestReviewRequest
): Promise<GitHubPullRequestReviewResponse> {
  return apiClient.githubPullRequestReview(input);
}
