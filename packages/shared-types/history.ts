import type { Severity } from "./findings.js";

export interface ProjectHistoryItem {
  scanId: string;
  projectId: string;
  repositoryId: string;
  scanType: string;
  score: number;
  severity: Severity;
  createdAt: string;
}

export interface ProjectHistoryResponse {
  projectId: string;
  history: ProjectHistoryItem[];
}
