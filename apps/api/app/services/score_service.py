from app.schemas.score import ProjectScoreResponse
from app.repositories.store import security_store


def get_project_score(project_id: str) -> ProjectScoreResponse:
    persisted = security_store.latest_project_score(project_id)
    if persisted is not None:
        score, severity = persisted
        return ProjectScoreResponse(projectId=project_id, score=score, severity=severity)

    return ProjectScoreResponse(projectId=project_id, score=100, severity="low")
