from fastapi import APIRouter

from app.schemas.scan import ScanCreateRequest, ScanResponse
from app.services.scan_service import create_scan

router = APIRouter(tags=["scan"])


@router.post("/scan", response_model=ScanResponse)
def scan(request: ScanCreateRequest) -> ScanResponse:
    return create_scan(request)

