from pydantic import Field

from app.schemas.base import CamelModel


class ProjectHistoryItemResponse(CamelModel):
    scan_id: str = Field(alias="scanId")
    project_id: str = Field(alias="projectId")
    repository_id: str = Field(alias="repositoryId")
    scan_type: str = Field(alias="scanType")
    score: int
    severity: str
    created_at: str = Field(alias="createdAt")


class ProjectHistoryResponse(CamelModel):
    project_id: str = Field(alias="projectId")
    history: list[ProjectHistoryItemResponse]
