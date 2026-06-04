import { apiClient } from "../clients/apiClient.js";

export async function secretScan(projectId: string): Promise<{ projectId: string; totalSecrets: number }> {
  return apiClient.secrets(projectId);
}

