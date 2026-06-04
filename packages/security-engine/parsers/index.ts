import type { Finding } from "@goaegis/shared-types";

export interface ScannerPayload {
  source: string;
  findings: Finding[];
}

export function parseScannerPayload(payload: ScannerPayload): Finding[] {
  void payload.source;
  return payload.findings;
}

