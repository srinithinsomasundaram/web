import type { ScanRequest, ScanResponse } from "@goaegis/shared-types";

import { apiClient } from "../clients/apiClient.js";

export async function securityScan(input: ScanRequest): Promise<ScanResponse> {
  return apiClient.scan(input);
}

