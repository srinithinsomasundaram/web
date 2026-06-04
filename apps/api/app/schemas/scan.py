from pydantic import Field

from app.schemas.base import CamelModel


class FindingResponse(CamelModel):
    id: str
    project_id: str = Field(alias="projectId")
    repository_id: str = Field(alias="repositoryId")
    scanner: str
    rule_id: str = Field(alias="ruleId")
    title: str
    description: str
    severity: str
    file_path: str = Field(alias="filePath")
    line_start: int | None = Field(default=None, alias="lineStart")
    line_end: int | None = Field(default=None, alias="lineEnd")
    fingerprint: str
    created_at: str = Field(alias="createdAt")


class ScanCreateRequest(CamelModel):
    project_id: str = Field(alias="projectId")
    repository_id: str = Field(alias="repositoryId")
    ref: str | None = None
    path: str | None = None


class ScanSummaryResponse(CamelModel):
    project_id: str = Field(alias="projectId")
    repository_id: str = Field(alias="repositoryId")
    total_findings: int = Field(alias="totalFindings")
    critical_findings: int = Field(alias="criticalFindings")
    high_findings: int = Field(alias="highFindings")
    score: int


class ScanResponse(CamelModel):
    scan_id: str = Field(alias="scanId")
    summary: ScanSummaryResponse
    max_severity: str = Field(alias="maxSeverity")
    findings: list[FindingResponse] = Field(default_factory=list)
