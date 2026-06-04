import type { ReviewRequest, ReviewResponse } from "@goaegis/shared-types";

import { apiClient } from "../clients/apiClient.js";

export async function githubReview(input: ReviewRequest): Promise<ReviewResponse> {
  return apiClient.githubReview(input);
}
