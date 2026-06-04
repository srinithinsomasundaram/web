export type TelemetryEventName =
  | "app_activated"
  | "scan_completed"
  | "workspace_scan"
  | "review_completed"
  | "review_generated"
  | "review_published"
  | "fix_applied"
  | "finding_clicked"
  | "feature_used";

export interface TelemetryProperties {
  [key: string]: string | number | boolean | null | undefined;
}

export interface TelemetryEventRequest {
  anonymousId: string;
  eventName: TelemetryEventName;
  source?: string;
  properties?: TelemetryProperties;
}

export interface TelemetryEventResponse {
  accepted: boolean;
  eventId: string;
  createdAt: string;
}

export interface TelemetrySummaryResponse {
  workspaceScans: number;
  fixesApplied: number;
  reviewsGenerated: number;
  reviewsPublished: number;
}
