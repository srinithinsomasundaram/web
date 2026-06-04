from fastapi import APIRouter

from app.schemas.secrets import SecretScanRequest, SecretScanResponse
from app.services.secrets_service import scan_secrets

router = APIRouter(tags=["secrets"])


@router.post("/secrets", response_model=SecretScanResponse)
def secrets(request: SecretScanRequest) -> SecretScanResponse:
    return scan_secrets(request)

