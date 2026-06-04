import logging

from fastapi import FastAPI

from app.config.settings import settings
from app.api.history import router as history_router
from app.api.fix import router as fix_router
from app.api.github import router as github_router
from app.api.review import router as review_router
from app.api.scan import router as scan_router
from app.api.score import router as score_router
from app.api.secrets import router as secrets_router
from app.api.telemetry import router as telemetry_router

app = FastAPI(title="GoAegis API", version="1.0.0")

logging.getLogger().setLevel(getattr(logging, settings.log_level.upper(), logging.INFO))

app.include_router(scan_router, prefix="/api/v1")
app.include_router(fix_router, prefix="/api/v1")
app.include_router(review_router, prefix="/api/v1")
app.include_router(github_router, prefix="/api/v1")
app.include_router(history_router, prefix="/api/v1")
app.include_router(secrets_router, prefix="/api/v1")
app.include_router(score_router, prefix="/api/v1")
app.include_router(telemetry_router, prefix="/api/v1")


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}
