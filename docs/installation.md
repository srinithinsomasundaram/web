# Installation

## Prerequisites

- Node.js 18+ for the extension and MCP packages
- Python 3.11+ for the API
- `semgrep` installed on `PATH`
- `gitleaks` installed on `PATH`
- `gh` installed on `PATH` if you want GitHub PR auto-detection

## Environment

See [configuration](configuration.md) for the full environment matrix.

At minimum, the backend should have:

- `ENVIRONMENT`
- `LOG_LEVEL`
- `DATABASE_URL`
- `GEMINI_API_KEY`
- `GOAEGIS_GITHUB_TOKEN`
- `GOAEGIS_GITHUB_API_URL`
- `SENTRY_DSN`
- `GOAEGIS_TELEMETRY_ENABLED`

The extension and MCP layer only need:

- `GOAEGIS_API_BASE_URL`

## Install

1. Run `npm install` at the repository root.
2. Install Python dependencies for `apps/api` from `apps/api/requirements.txt`.
3. Build or typecheck the workspace with `npm run check`.
4. Start the backend with `npm run dev:backend` from the repository root, or run the API manually from `apps/api`.
5. Launch the extension in VS Code from `apps/extension` using the `GoAegis: Run Extension` debug configuration.

The extension launches with `GOAEGIS_API_BASE_URL=http://127.0.0.1:8000` already set in [.vscode/launch.json](../.vscode/launch.json).

Note: the MCP server is spawned on demand by the extension client, so you do not need to keep a separate MCP process running.
The backend startup script also checks that `semgrep` and `gitleaks` are installed, because without them the scan API cannot return findings to the Security panel.
If they are missing, the Security panel shows an `Install scanners` action that runs `brew install semgrep gitleaks` on macOS.
If the Python environment is missing, use the `Install Backend Prerequisites` action in the extension to create `apps/api/.venv` and install the backend requirements.

## Packaging the Extension

To generate a distributable VSIX:

```bash
npm run package:extension
```

The artifact is written to `release/goaegis-extension.vsix`.

To install the packaged extension in VS Code:

1. Open the Command Palette.
2. Run `Extensions: Install from VSIX...`
3. Select `release/goaegis-extension.vsix`

For production, set the same variables in Railway or your deployment platform rather than checking in `.env.production`.

## First Run

1. Open a file with a known vulnerability.
2. Save the file.
3. Confirm GoAegis diagnostics appear.
4. Open the GoAegis sidebar to see the score and findings.
5. Run `GoAegis: Review Current File` or `GoAegis: Review Current PR`.
