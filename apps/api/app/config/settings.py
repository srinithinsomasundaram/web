from functools import lru_cache
import os

from pydantic import BaseModel, Field


class Settings(BaseModel):
    environment: str = Field(default="development")
    log_level: str = Field(default="INFO")
    database_url: str = Field(default="postgresql://localhost/goaegis")
    gemini_api_key: str | None = None
    github_token: str | None = None
    github_api_url: str = Field(default="https://api.github.com")
    sentry_dsn: str | None = None
    telemetry_enabled: bool = True

    @classmethod
    def from_env(cls) -> "Settings":
        return cls(
            environment=os.environ.get("ENVIRONMENT") or os.environ.get("GOAEGIS_ENV", "development"),
            log_level=os.environ.get("LOG_LEVEL") or os.environ.get("GOAEGIS_LOG_LEVEL", "INFO"),
            database_url=os.environ.get("DATABASE_URL")
            or os.environ.get("GOAEGIS_DATABASE_URL")
            or "postgresql://localhost/goaegis",
            gemini_api_key=os.environ.get("GEMINI_API_KEY") or os.environ.get("GOAEGIS_GEMINI_API_KEY"),
            github_token=os.environ.get("GOAEGIS_GITHUB_TOKEN") or os.environ.get("GITHUB_TOKEN"),
            github_api_url=os.environ.get("GOAEGIS_GITHUB_API_URL")
            or os.environ.get("GITHUB_API_URL")
            or "https://api.github.com",
            sentry_dsn=os.environ.get("SENTRY_DSN") or os.environ.get("GOAEGIS_SENTRY_DSN"),
            telemetry_enabled=(
                os.environ.get("GOAEGIS_TELEMETRY_ENABLED")
                or os.environ.get("TELEMETRY_ENABLED", "true")
            ).lower()
            not in {"0", "false", "no"},
        )


settings = Settings.from_env()


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return settings
