from fastapi import APIRouter

from app.schemas.fix import FixCreateRequest, FixResponse
from app.services.fix_service import create_fix

router = APIRouter(tags=["fix"])


@router.post("/fix", response_model=FixResponse)
def fix(request: FixCreateRequest) -> FixResponse:
    return create_fix(request)

