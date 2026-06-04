from fastapi import APIRouter

from app.schemas.github_review import GitHubPullRequestReviewCreateRequest, GitHubPullRequestReviewResponse
from app.services.github_service import create_github_pull_request_review

router = APIRouter(tags=["github"])


@router.post("/github/pr/review", response_model=GitHubPullRequestReviewResponse)
def github_pull_request_review(request: GitHubPullRequestReviewCreateRequest) -> GitHubPullRequestReviewResponse:
    return create_github_pull_request_review(request)
