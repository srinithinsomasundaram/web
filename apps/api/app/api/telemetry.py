from fastapi import APIRouter

from app.schemas.telemetry import TelemetryEventRequest, TelemetryEventResponse, TelemetrySummaryResponse
from app.services.telemetry_service import get_telemetry_summary, track_telemetry_event

router = APIRouter(tags=["telemetry"])


@router.post("/telemetry/events", response_model=TelemetryEventResponse)
def telemetry_events(request: TelemetryEventRequest) -> TelemetryEventResponse:
    return track_telemetry_event(request)


@router.get("/telemetry/summary", response_model=TelemetrySummaryResponse)
def telemetry_summary() -> TelemetrySummaryResponse:
    return get_telemetry_summary()
