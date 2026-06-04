import type {
  FixRequest,
  FixResponse,
  GitHubPullRequestReviewRequest,
  GitHubPullRequestReviewResponse,
  ProjectHistoryResponse,
  ReviewRequest,
  ReviewResponse,
  ScanRequest,
  ScanResponse,
  TelemetryEventRequest,
  TelemetryEventResponse,
  TelemetrySummaryResponse,
  Severity
} from "@goaegis/shared-types";

export interface GoAegisClientOptions {
  baseUrl: string;
  fetchImpl?: typeof fetch;
}

export class GoAegisClient {
  private readonly baseUrl: string;
  private readonly fetchImpl: typeof fetch;

  constructor(options: GoAegisClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, "");
    this.fetchImpl = options.fetchImpl ?? fetch;
  }

  async scan(payload: ScanRequest): Promise<ScanResponse> {
    return this.post<ScanResponse>("/api/v1/scan", payload);
  }

  async fix(payload: FixRequest): Promise<FixResponse> {
    return this.post<FixResponse>("/api/v1/fix", payload);
  }

  async githubReview(payload: ReviewRequest): Promise<ReviewResponse> {
    return this.post<ReviewResponse>("/api/v1/github/review", payload);
  }

  async githubPullRequestReview(
    payload: GitHubPullRequestReviewRequest
  ): Promise<GitHubPullRequestReviewResponse> {
    return this.post<GitHubPullRequestReviewResponse>("/api/v1/github/pr/review", payload);
  }

  async secrets(projectId: string): Promise<{ projectId: string; totalSecrets: number }> {
    return this.post("/api/v1/secrets", { projectId });
  }

  async score(projectId: string): Promise<{ projectId: string; score: number; severity: Severity }> {
    return this.get(`/api/v1/score/${encodeURIComponent(projectId)}`);
  }

  async projectHistory(projectId: string): Promise<ProjectHistoryResponse> {
    return this.get(`/api/v1/project/${encodeURIComponent(projectId)}/history`);
  }

  async telemetryEvent(payload: TelemetryEventRequest): Promise<TelemetryEventResponse> {
    return this.post<TelemetryEventResponse>("/api/v1/telemetry/events", payload);
  }

  async telemetrySummary(): Promise<TelemetrySummaryResponse> {
    return this.get<TelemetrySummaryResponse>("/api/v1/telemetry/summary");
  }

  private async get<T>(path: string): Promise<T> {
    const response = await this.fetchImpl(`${this.baseUrl}${path}`);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return response.json() as Promise<T>;
  }

  private async post<T>(path: string, body: unknown): Promise<T> {
    const response = await this.fetchImpl(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return response.json() as Promise<T>;
  }
}
