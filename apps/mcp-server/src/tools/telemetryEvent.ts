import type { TelemetryEventRequest, TelemetryEventResponse } from "@goaegis/shared-types";

import { apiClient } from "../clients/apiClient.js";

export async function telemetryEvent(input: TelemetryEventRequest): Promise<TelemetryEventResponse> {
  return apiClient.telemetryEvent(input);
}
