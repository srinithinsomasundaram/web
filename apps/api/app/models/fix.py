from dataclasses import dataclass
from datetime import datetime


@dataclass(slots=True)
class Fix:
    id: str
    finding_id: str
    patch: str
    created_at: datetime

