from pydantic import Field

from app.schemas.base import CamelModel


class FixCreateRequest(CamelModel):
    project_id: str = Field(alias="projectId")
    finding_id: str = Field(alias="findingId")
    provider: str | None = None


class FixResponse(CamelModel):
    fix_id: str = Field(alias="fixId")
    finding_id: str = Field(alias="findingId")
    severity: str
    patch: str
    explanation: str
