from pydantic import Field

from app.schemas.base import CamelModel


class ReviewCreateRequest(CamelModel):
    project_id: str = Field(alias="projectId")
    repository_id: str = Field(alias="repositoryId")
    source: str = Field(default="current-file")
    path: str | None = None
    title: str | None = None
    content: str | None = None
    diff: str | None = None
    provider: str | None = None


class ReviewCommentResponse(CamelModel):
    path: str
    line: int
    severity: str
    message: str
    suggestion: str | None = None


class ReviewResponse(CamelModel):
    review_id: str = Field(alias="reviewId")
    project_id: str = Field(alias="projectId")
    repository_id: str = Field(alias="repositoryId")
    source: str
    target_label: str = Field(alias="targetLabel")
    provider: str
    score: int
    severity: str
    summary: str
    top_risks: list[str] = Field(alias="topRisks")
    recommended_improvements: list[str] = Field(alias="recommendedImprovements")
    architecture_concerns: list[str] = Field(alias="architectureConcerns")
    comments: list[ReviewCommentResponse]
