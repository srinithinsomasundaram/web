from app.schemas.scan import FindingResponse, ScanCreateRequest, ScanResponse, ScanSummaryResponse
from app.repositories.store import new_scan_snapshot, security_store
from app.services.security_engine import calculate_security_score, max_severity, run_security_scan, to_public_finding


def create_scan(request: ScanCreateRequest) -> ScanResponse:
    findings = run_security_scan(request.project_id, request.repository_id, request.path)
    total_findings = len(findings)
    critical_findings = sum(1 for finding in findings if finding.severity == "critical")
    high_findings = sum(1 for finding in findings if finding.severity == "high")
    score = calculate_security_score(findings)
    scan_snapshot = new_scan_snapshot(
        project_id=request.project_id,
        repository_id=request.repository_id,
        score=score,
        max_severity=max_severity(findings),
        scan_type="security",
    )
    security_store.save_scan(
        scan_snapshot,
        findings,
    )

    return ScanResponse(
        scanId=scan_snapshot.scan_id,
        summary=ScanSummaryResponse(
            projectId=request.project_id,
            repositoryId=request.repository_id,
            totalFindings=total_findings,
            criticalFindings=critical_findings,
            highFindings=high_findings,
            score=score,
        ),
        maxSeverity=scan_snapshot.max_severity,
        findings=[
            FindingResponse.model_validate(to_public_finding(finding))
            for finding in findings
        ],
    )
