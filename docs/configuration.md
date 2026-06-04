# Configuration

GoAegis keeps backend configuration in one place: `apps/api/app/config/settings.py`.

## Environment Variables

Use the following variables for local development and production:

- `ENVIRONMENT`
- `LOG_LEVEL`
- `DATABASE_URL`
- `GEMINI_API_KEY`
- `SENTRY_DSN`
- `GOAEGIS_GITHUB_TOKEN`
- `GOAEGIS_GITHUB_API_URL`
- `GOAEGIS_TELEMETRY_ENABLED`
- `GOAEGIS_API_BASE_URL`

## Local Setup

Copy the example file and fill in local values:

```bash
cp .env.example .env
```

Recommended local values:

- `ENVIRONMENT=development`
- `LOG_LEVEL=DEBUG`
- `DATABASE_URL=postgresql://localhost/goaegis`
- `GOAEGIS_GITHUB_API_URL=https://api.github.com`
- `GOAEGIS_TELEMETRY_ENABLED=true`

Leave secrets blank until you actually need them:

- `GEMINI_API_KEY`
- `GOAEGIS_GITHUB_TOKEN`
- `SENTRY_DSN`

## Production Setup

Set these values in Railway or your hosting platform:

- `ENVIRONMENT=production`
- `LOG_LEVEL=INFO`
- `DATABASE_URL`
- `GEMINI_API_KEY`
- `GOAEGIS_GITHUB_TOKEN`
- `GOAEGIS_GITHUB_API_URL`
- `SENTRY_DSN`

Keep telemetry explicit:

- `GOAEGIS_TELEMETRY_ENABLED=true` in production
- turn it off only if you have a strong reason

## Secret Handling

- Never commit `.env`, `.env.production`, or any real credentials.
- The extension must never contain API keys.
- Only the backend should know `GEMINI_API_KEY` and GitHub tokens.
- If a secret was ever committed, rotate it immediately.

## Launch Check

Before inviting users, run a secret scan against the repo:

```bash
gitleaks detect
```

Also inspect git history for accidental commits of:

- Gemini keys
- GitHub tokens
- database credentials
