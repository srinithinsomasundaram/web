import type { Severity } from "./findings.js";
import type { Finding } from "./findings.js";

export interface ScanRequest {
  projectId: string;
  repositoryId: string;
  ref?: string;
  path?: string;
}

export interface ScanSummary {
  projectId: string;
  repositoryId: string;
  totalFindings: number;
  criticalFindings: number;
  highFindings: number;
  score: number;
}

export interface ScanResponse {
  scanId: string;
  summary: ScanSummary;
  maxSeverity: Severity;
  findings?: Finding[];
}

export interface ScanHistoryEntry {
  scanId: string;
  projectId: string;
  repositoryId: string;
  scanType: string;
  score: number;
  severity: Severity;
  createdAt: string;
}
