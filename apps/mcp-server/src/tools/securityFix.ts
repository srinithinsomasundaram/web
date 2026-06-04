import type { FixRequest, FixResponse } from "@goaegis/shared-types";

import { apiClient } from "../clients/apiClient.js";

export async function securityFix(input: FixRequest): Promise<FixResponse> {
  return apiClient.fix(input);
}

