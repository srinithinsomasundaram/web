from app.schemas.base import CamelModel


class APIMessage(CamelModel):
    message: str
