import type { Severity } from "@goaegis/shared-types";

import { apiClient } from "../clients/apiClient.js";

export async function projectScore(projectId: string): Promise<{ projectId: string; score: number; severity: Severity }> {
  return apiClient.score(projectId);
}

