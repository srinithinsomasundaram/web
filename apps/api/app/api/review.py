from fastapi import APIRouter

from app.schemas.review import ReviewCreateRequest, ReviewResponse
from app.services.review_service import create_review

router = APIRouter(tags=["review"])


@router.post("/github/review", response_model=ReviewResponse)
def github_review(request: ReviewCreateRequest) -> ReviewResponse:
    return create_review(request)
