from __future__ import annotations

from dataclasses import dataclass

from app.config.settings import settings
from app.repositories.store import security_store, new_telemetry_snapshot
from app.schemas.telemetry import TelemetryEventRequest, TelemetryEventResponse, TelemetrySummaryResponse


@dataclass(slots=True)
class TelemetryEventRecord:
    anonymous_id: str
    event_name: str
    source: str | None
    properties: dict[str, str | int | bool | None] | None


def track_telemetry_event(request: TelemetryEventRequest) -> TelemetryEventResponse:
    if not settings.telemetry_enabled:
        return TelemetryEventResponse(
            accepted=False,
            eventId="disabled",
            createdAt="",
        )

    event = new_telemetry_snapshot(
        anonymous_id=request.anonymous_id,
        event_name=request.event_name,
        source=request.source,
        properties=request.properties or {},
    )
    security_store.save_telemetry(event)
    return TelemetryEventResponse(
        accepted=True,
        eventId=event.event_id,
        createdAt=event.created_at,
    )


def get_telemetry_summary() -> TelemetrySummaryResponse:
    summary = security_store.telemetry_summary()
    return TelemetrySummaryResponse(
        workspaceScans=summary.get("workspace_scans", 0),
        fixesApplied=summary.get("fixes_applied", 0),
        reviewsGenerated=summary.get("reviews_generated", 0),
        reviewsPublished=summary.get("reviews_published", 0),
    )
