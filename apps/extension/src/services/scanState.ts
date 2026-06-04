import type { ScanResponse } from "@goaegis/shared-types";
import type { Severity } from "@goaegis/shared-types";
import type { ProjectHistoryResponse } from "@goaegis/shared-types";

type Listener = (scan: ScanResponse | undefined) => void;
type ErrorListener = (message: string | undefined) => void;

export interface ProjectScoreState {
  projectId: string;
  score: number;
  severity: Severity;
}

let latestScan: ScanResponse | undefined;
let latestScanError: string | undefined;
let latestProjectScore: ProjectScoreState | undefined;
let latestProjectHistory: ProjectHistoryResponse | undefined;
const findingsByDocument = new Map<string, NonNullable<ScanResponse["findings"]>>();
const listeners = new Set<Listener>();
const errorListeners = new Set<ErrorListener>();

export function setLatestScan(scan: ScanResponse): void {
  latestScan = scan;
  latestScanError = undefined;
  for (const listener of listeners) {
    listener(latestScan);
  }
  for (const listener of errorListeners) {
    listener(latestScanError);
  }
}

export function setLatestScanError(message: string | undefined): void {
  latestScanError = message;
  for (const listener of errorListeners) {
    listener(latestScanError);
  }
}

export function setFindingsForDocument(documentUri: string, scan: ScanResponse): void {
  findingsByDocument.set(documentUri, scan.findings ?? []);
}

export function getLatestScan(): ScanResponse | undefined {
  return latestScan;
}

export function getLatestScanError(): string | undefined {
  return latestScanError;
}

export function setLatestProjectScore(score: ProjectScoreState): void {
  latestProjectScore = score;
}

export function getLatestProjectScore(): ProjectScoreState | undefined {
  return latestProjectScore;
}

export function setLatestProjectHistory(history: ProjectHistoryResponse): void {
  latestProjectHistory = history;
}

export function getLatestProjectHistory(): ProjectHistoryResponse | undefined {
  return latestProjectHistory;
}

export function getFindingsForDocument(documentUri: string): NonNullable<ScanResponse["findings"]> {
  return findingsByDocument.get(documentUri) ?? [];
}

export function findFindingById(documentUri: string, findingId: string) {
  return getFindingsForDocument(documentUri).find((finding) => finding.id === findingId);
}

export function subscribeToScanState(listener: Listener): () => void {
  listeners.add(listener);
  listener(latestScan);
  return () => {
    listeners.delete(listener);
  };
}

export function subscribeToScanError(listener: ErrorListener): () => void {
  errorListeners.add(listener);
  listener(latestScanError);
  return () => {
    errorListeners.delete(listener);
  };
}
