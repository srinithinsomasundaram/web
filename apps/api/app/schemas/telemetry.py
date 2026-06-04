from pydantic import Field

from app.schemas.base import CamelModel


class TelemetryEventRequest(CamelModel):
    anonymous_id: str = Field(alias="anonymousId")
    event_name: str = Field(alias="eventName")
    source: str | None = None
    properties: dict[str, str | int | bool | None] | None = None


class TelemetryEventResponse(CamelModel):
    accepted: bool
    event_id: str = Field(alias="eventId")
    created_at: str = Field(alias="createdAt")


class TelemetrySummaryResponse(CamelModel):
    workspace_scans: int = Field(alias="workspaceScans")
    fixes_applied: int = Field(alias="fixesApplied")
    reviews_generated: int = Field(alias="reviewsGenerated")
    reviews_published: int = Field(alias="reviewsPublished")
