import type { ScanResponse } from "@goaegis/shared-types";

import { runFileScan } from "./mcpService.js";

export async function scanDocument(path: string): Promise<ScanResponse> {
  return runFileScan(path);
}

