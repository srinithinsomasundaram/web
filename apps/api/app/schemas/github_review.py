from pydantic import Field

from app.schemas.base import CamelModel
from app.schemas.review import ReviewCommentResponse, ReviewResponse


class GitHubPullRequestReviewCreateRequest(CamelModel):
    project_id: str = Field(alias="projectId")
    repository_id: str = Field(alias="repositoryId")
    owner: str
    repo: str
    pull_number: int = Field(alias="pullNumber")
    head_sha: str | None = Field(default=None, alias="headSha")
    base_sha: str | None = Field(default=None, alias="baseSha")
    source: str = "pull-request"
    path: str | None = None
    title: str | None = None
    content: str | None = None
    diff: str | None = None
    provider: str | None = None


class GitHubReviewPostResponse(CamelModel):
    status: str
    review_id: int | None = Field(default=None, alias="reviewId")
    review_url: str | None = Field(default=None, alias="reviewUrl")
    message: str | None = None


class GitHubPullRequestReviewResponse(ReviewResponse):
    published: bool
    github_review_id: int | None = Field(default=None, alias="githubReviewId")
    github_review_url: str | None = Field(default=None, alias="githubReviewUrl")
    github_status: str = Field(alias="githubStatus")
    github_message: str | None = Field(default=None, alias="githubMessage")
