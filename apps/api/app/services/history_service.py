from app.repositories.store import security_store
from app.schemas.history import ProjectHistoryItemResponse, ProjectHistoryResponse


def get_project_history(project_id: str, limit: int = 8) -> ProjectHistoryResponse:
    scans = list(reversed(security_store.list_project_scans(project_id, limit=limit)))
    return ProjectHistoryResponse(
        projectId=project_id,
        history=[
            ProjectHistoryItemResponse(
                scanId=scan.scan_id,
                projectId=scan.project_id,
                repositoryId=scan.repository_id,
                scanType=scan.scan_type,
                score=scan.score,
                severity=scan.max_severity,
                createdAt=scan.created_at,
            )
            for scan in scans
        ],
    )
