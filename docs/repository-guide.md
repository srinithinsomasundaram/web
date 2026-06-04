# GoAegis Repository Guide

This guide explains the full GoAegis workspace, how the parts fit together, and how to run the public landing page locally.

## What GoAegis Is

GoAegis is a layered developer security platform:

- the VS Code extension watches files and surfaces diagnostics
- the MCP layer orchestrates tool calls
- the API owns scan, review, score, history, telemetry, and GitHub review logic
- shared packages keep contracts, SDKs, and engines separated

The repo is organized so each layer can evolve without collapsing into a monolith.

## Repository Layout

```text
goaegis/
├── apps/
│   ├── api/
│   ├── mcp-server/
│   ├── extension/
│   └── dashboard/
├── packages/
│   ├── shared-types/
│   ├── sdk/
│   ├── security-engine/
│   ├── ai-engine/
│   ├── policy-engine/
│   ├── mcp-client/
│   └── logger/
├── infrastructure/
├── docs/
├── .github/
└── package.json
```

## Apps

### `apps/api`

FastAPI backend.

Responsibilities:

- security scans
- fix generation
- GitHub PR review generation and publishing
- project score
- project history
- telemetry ingestion
- secrets scanning

Entry point:

- `apps/api/app/main.py`

Run requirement:

- Python dependencies from `apps/api/requirements.txt`

### `apps/mcp-server`

MCP gateway layer.

Responsibilities:

- expose tool definitions
- dispatch requests to the API
- keep transport concerns separate from business logic

Entry point:

- `apps/mcp-server/src/main.ts`

### `apps/extension`

VS Code extension.

Responsibilities:

- scan on save
- show diagnostics
- render the security panel
- render the review panel
- trigger one-click fix
- trigger workspace scans
- trigger file and PR reviews

Entry point:

- `apps/extension/src/extension.ts`

### `apps/dashboard`

Static landing page for the product.

Responsibilities:

- public product homepage
- install / demo entry point
- browser-based demo page for environments without an extension host

Entry point:

- `apps/dashboard/index.html`
- `apps/dashboard/demo.html`

### `packages/shared-types`

Canonical request and response shapes for scans, findings, fixes, reviews, history, policies, telemetry, and users.

### `packages/sdk`

Client wrapper around the API contracts.

### `packages/security-engine`

Scanner and scoring package.

### `packages/ai-engine`

Provider abstraction for AI remediations and reviews.

### `packages/policy-engine`

Policy and gating rules package for future enforcement work.

### `packages/mcp-client`

Client-side MCP transport wrapper used by the extension.

### `packages/logger`

Lightweight logging package placeholder.

## How The Pieces Fit Together

```text
VS Code Extension
    ↓
MCP Client
    ↓
MCP Server
    ↓
API Backend
    ↓
Security / AI / Policy / Persistence
```

The key rule is that the extension never calls the scanner or AI engine directly. It goes through MCP and the API.

## Local Development

### Root checks

From the repository root:

```bash
npm install
npm run check
```

### API

```bash
cd apps/api
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --host 127.0.0.1 --port 8000
```

Health check:

```bash
curl http://127.0.0.1:8000/health
```

### MCP server

```bash
cd apps/mcp-server
npm install
npm run build
npm start
```

### One-command backend

From the repository root:

```bash
npm run dev:backend
```

This starts the FastAPI backend on `http://127.0.0.1:8000` and waits until the health endpoint is ready. The VS Code extension launches with `GOAEGIS_API_BASE_URL=http://127.0.0.1:8000` already set in [.vscode/launch.json](../.vscode/launch.json).

### Extension

Open `apps/extension` in VS Code or an extension-capable IDE and run the extension host. The extension expects:

- `GOAEGIS_API_BASE_URL=http://127.0.0.1:8000`

### Landing page

See the dedicated landing page guide in:

- `apps/dashboard/README.md`

## Runtime Configuration

Backend environment variables are documented in `docs/configuration.md`.

Common values:

- `DATABASE_URL`
- `GEMINI_API_KEY`
- `GOAEGIS_GITHUB_TOKEN`
- `GOAEGIS_GITHUB_API_URL`
- `SENTRY_DSN`
- `ENVIRONMENT`
- `LOG_LEVEL`

The extension should only receive:

- `GOAEGIS_API_BASE_URL`

## Documentation Index

- `README.md`
- `docs/architecture.md`
- `docs/configuration.md`
- `docs/installation.md`
- `docs/quickstart.md`
- `docs/demo-script.md`
- `docs/demo-end-to-end.md`
- `docs/beta-smoke-test.md`
- `docs/beta-launch-checklist.md`
- `docs/release-checklist.md`
- `apps/dashboard/README.md`
