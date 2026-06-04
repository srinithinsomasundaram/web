from uuid import uuid4

from app.schemas.fix import FixCreateRequest, FixResponse
from app.repositories.store import FixSnapshot, security_store
from app.services.ai_service import generate_fix


def create_fix(request: FixCreateRequest) -> FixResponse:
    provider = request.provider or "gemini"
    finding = security_store.find_finding_by_id(request.finding_id)
    if finding is None:
        patch, explanation = generate_fix(provider, None)
        severity = "medium"
    else:
        patch, explanation = generate_fix(provider, finding)
        severity = finding.severity
    fix_id = str(uuid4())
    security_store.save_fix(
        FixSnapshot(
            fix_id=fix_id,
            project_id=request.project_id,
            finding_id=request.finding_id,
            provider=provider,
            patch=patch,
            explanation=explanation,
        )
    )
    return FixResponse(
        fixId=fix_id,
        findingId=request.finding_id,
        severity=severity,
        patch=patch,
        explanation=explanation,
    )
