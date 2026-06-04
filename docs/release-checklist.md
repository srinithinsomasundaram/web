# Release Checklist

Use this before any public or private beta release.

## Product

- [ ] `GoAegis: Save and Scan` works on the test fixtures.
- [ ] `GoAegis: Review Current File` produces useful comments.
- [ ] `GoAegis: Review Current PR` auto-detects repo and PR when possible.
- [ ] One-click fixes apply a valid workspace edit.
- [ ] The sidebar shows score, findings, history, and trend.

## Platform

- [ ] API health endpoint returns `ok`.
- [ ] MCP tools resolve through the API.
- [ ] PostgreSQL persistence is configured.
- [ ] Semgrep is installed on the release machine.
- [ ] Gitleaks is installed on the release machine.
- [ ] Production environment variables are set in the host platform.
- [ ] `.env.production` is not committed.

## Privacy and Safety

- [ ] Anonymous telemetry is enabled or intentionally disabled.
- [ ] No code content is written to telemetry.
- [ ] No file paths are written to telemetry.
- [ ] GitHub token permissions are scoped to review posting only.
- [ ] `gitleaks detect` passes on the repository.

## Demo Readiness

- [ ] Landing page is deployed or ready to share.
- [ ] Demo script is rehearsed.
- [ ] Installation instructions are up to date.
- [ ] The extension packages into a `.vsix` release artifact.
- [ ] Screenshots or a short screen recording exist.

## Go / No-Go

- [ ] At least one external developer has tried the flow.
- [ ] At least one external developer understands the value immediately.
- [ ] The team is ready to stop feature work and collect feedback.
