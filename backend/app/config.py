from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Portfolio API"
    database_url: str = "postgresql://portfolio_user:portfolio_pass@db:5432/portfolio_db"
    owner_api_key: str = "change-this-to-a-strong-secret-key"
    gemini_api_key: str = ""
    upload_dir: str = "/app/uploads"
    cors_origins: str = "*"
    supabase_url: str = ""
    supabase_service_role_key: str = ""
    supabase_bucket: str = "portfolio-assets"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
