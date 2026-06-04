from fastapi import APIRouter

from app.schemas.history import ProjectHistoryResponse
from app.services.history_service import get_project_history

router = APIRouter(tags=["history"])


@router.get("/project/{project_id}/history", response_model=ProjectHistoryResponse)
def history(project_id: str) -> ProjectHistoryResponse:
    return get_project_history(project_id)
