from pydantic import Field

from app.schemas.base import CamelModel


class ProjectScoreResponse(CamelModel):
    project_id: str = Field(alias="projectId")
    score: int
    severity: str
