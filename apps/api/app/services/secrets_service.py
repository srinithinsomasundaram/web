from app.schemas.secrets import SecretScanRequest, SecretScanResponse
from app.repositories.store import new_scan_snapshot, security_store
from app.services.security_engine import calculate_security_score, max_severity, run_secret_scan


def scan_secrets(request: SecretScanRequest) -> SecretScanResponse:
    repository_id = request.repository_id or request.project_id
    findings = run_secret_scan(request.project_id, repository_id, None)
    score = calculate_security_score(findings)
    severity = max_severity(findings)
    security_store.save_scan(
        new_scan_snapshot(
            project_id=request.project_id,
            repository_id=repository_id,
            score=score,
            max_severity=severity,
            scan_type="secrets",
        ),
        findings,
    )
    return SecretScanResponse(projectId=request.project_id, totalSecrets=len(findings))
