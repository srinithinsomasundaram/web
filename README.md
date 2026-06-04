# GoAegis

GoAegis is a layered security platform for developers. The extension, MCP layer, API, and engines stay isolated so the system can grow without a rewrite.

## Quick Start

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Start the API, MCP server, and extension workspace using the package scripts in each app.
4. Open the VS Code extension workspace and run `GoAegis: Save and Scan` on a vulnerable file.
5. Use `GoAegis: Review Current PR` once your GitHub token and repo are configured.

## What GoAegis Does

- Scans files on save.
- Publishes diagnostics in VS Code.
- Generates one-click remediation suggestions.
- Reviews current files and GitHub pull requests.
- Tracks project score history and trend lines.
- Records anonymous usage telemetry.

## Architecture Boundaries

- Extension: save file, call MCP, show diagnostics.
- MCP: orchestration only.
- API: FastAPI routes that delegate to services.
- Security engine: scanners, parsers, transformers, scoring.
- AI engine: provider abstraction only.
- Policy engine: validation and gating rules.

## Repository Layout

- `apps/api`
- `apps/mcp-server`
- `apps/extension`
- `apps/dashboard`
- `packages/shared-types`
- `packages/sdk`
- `packages/security-engine`
- `packages/ai-engine`
- `packages/policy-engine`
- `packages/logger`

## Documentation

- [Repository guide](docs/repository-guide.md)
- [Configuration and secrets](docs/configuration.md)
- [Installation and setup](docs/installation.md)
- [P0 demo script](docs/demo-script.md)
- [Release checklist](docs/release-checklist.md)
- [Beta launch checklist](docs/beta-launch-checklist.md)
- [Beta smoke test](docs/beta-smoke-test.md)
- [Architecture overview](docs/architecture.md)
- [End-to-end demo flow](docs/demo-end-to-end.md)

## Product Surface

- Landing page: [apps/dashboard/index.html](apps/dashboard/index.html)
- Landing page guide: [apps/dashboard/README.md](apps/dashboard/README.md)
- Extension demo fixtures: `apps/extension/test-fixtures`
- Review UI: `apps/extension/src/views/ReviewPanel.ts`
- Security UI: `apps/extension/src/views/SecurityPanel.ts`
