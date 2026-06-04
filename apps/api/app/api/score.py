from fastapi import APIRouter

from app.schemas.score import ProjectScoreResponse
from app.services.score_service import get_project_score

router = APIRouter(tags=["score"])


@router.get("/score/{project_id}", response_model=ProjectScoreResponse)
def score(project_id: str) -> ProjectScoreResponse:
    return get_project_score(project_id)

