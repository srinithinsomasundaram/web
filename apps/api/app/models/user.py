from dataclasses import dataclass
from datetime import datetime


@dataclass(slots=True)
class User:
    id: str
    email: str
    created_at: datetime

