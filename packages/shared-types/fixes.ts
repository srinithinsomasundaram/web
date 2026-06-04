import type { Severity } from "./findings.js";

export interface FixRequest {
  projectId: string;
  findingId: string;
  provider?: "gemini" | "openai" | "anthropic";
}

export interface FixResponse {
  fixId: string;
  findingId: string;
  severity: Severity;
  patch: string;
  explanation: string;
}

