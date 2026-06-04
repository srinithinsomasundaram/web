import { randomUUID } from "node:crypto";

import * as vscode from "vscode";

import { GoAegisMcpClient } from "@goaegis/mcp-client";
import type { TelemetryEventName, TelemetryProperties } from "@goaegis/shared-types";

const TELEMETRY_ID_KEY = "goaegis.anonymousInstallationId";
const client = new GoAegisMcpClient();

export async function getAnonymousInstallationId(context: vscode.ExtensionContext): Promise<string> {
  const existing = context.globalState.get<string>(TELEMETRY_ID_KEY);
  if (existing) {
    return existing;
  }

  const id = randomUUID();
  await context.globalState.update(TELEMETRY_ID_KEY, id);
  return id;
}

export async function trackTelemetryEvent(
  context: vscode.ExtensionContext,
  eventName: TelemetryEventName,
  properties: TelemetryProperties = {},
  source?: string
): Promise<void> {
  const anonymousId = await getAnonymousInstallationId(context);

  try {
    await client.telemetryEvent({
      anonymousId,
      eventName,
      source,
      properties
    });
  } catch {
    // Telemetry must never block product flow.
  }
}
