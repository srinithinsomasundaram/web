from pydantic import Field

from app.schemas.base import CamelModel


class SecretScanRequest(CamelModel):
    project_id: str = Field(alias="projectId")
    repository_id: str | None = Field(default=None, alias="repositoryId")


class SecretScanResponse(CamelModel):
    project_id: str = Field(alias="projectId")
    total_secrets: int = Field(alias="totalSecrets")
