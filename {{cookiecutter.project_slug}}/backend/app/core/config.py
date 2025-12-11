import secrets
from functools import lru_cache
from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    PROJECT_NAME: str = Field(default="FastAPI React SQLPage")
    API_V1_STR: str = "/api/v1"

    # DB settings
    POSTGRES_SERVER: str = "postgres"
    POSTGRES_PORT: int = 5432
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_DB: str = "appdb"
    DATABASE_URL: str | None = None

    # Security
    SECRET_KEY: str = Field(default_factory=lambda: secrets.token_urlsafe(32))
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # Celery
    REDIS_BROKER: str = "redis://redis:6379/0"

    @property
    def SQLALCHEMY_DATABASE_URI(self):
        if self.DATABASE_URL:
            return self.DATABASE_URL

        return (
            f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}"
            f"@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
        )

    class Config:
        env_file = ".env"
        case_sensitive = True


@lru_cache()
def get_settings():
    return Settings()


settings = get_settings()

SQLALCHEMY_DATABASE_URI = settings.SQLALCHEMY_DATABASE_URI
