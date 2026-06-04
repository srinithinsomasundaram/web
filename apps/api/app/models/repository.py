from dataclasses import dataclass


@dataclass(slots=True)
class Repository:
    id: str
    project_id: str
    url: str

