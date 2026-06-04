from dataclasses import dataclass
from datetime import datetime


@dataclass(slots=True)
class Scan:
    id: str
    project_id: str
    repository_id: str
    created_at: datetime

