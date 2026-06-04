from dataclasses import dataclass
from datetime import datetime


@dataclass(slots=True)
class Finding:
    id: str
    project_id: str
    repository_id: str
    severity: str
    title: str
    file_path: str
    fingerprint: str
    created_at: datetime

