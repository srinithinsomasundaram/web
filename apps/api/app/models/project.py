from dataclasses import dataclass


@dataclass(slots=True)
class Project:
    id: str
    name: str
    repository_id: str

