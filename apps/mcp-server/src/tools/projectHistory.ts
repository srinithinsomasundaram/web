import type { ProjectHistoryResponse } from "@goaegis/shared-types";

import { apiClient } from "../clients/apiClient.js";

export async function projectHistory(projectId: string): Promise<ProjectHistoryResponse> {
  return apiClient.projectHistory(projectId);
}
