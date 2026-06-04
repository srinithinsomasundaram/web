# GoAegis VS Code Extension

GoAegis brings AI-assisted security scanning, GitHub PR review, and one-click remediation into VS Code.

## What it does

- scans files and workspaces through the local MCP path
- renders findings in the GoAegis sidebar
- generates PR review comments
- suggests and applies remediation fixes
- tracks security score and scan history

## Requirements

- VS Code 1.85 or newer
- the GoAegis API running locally or in a deployed environment
- `GOAEGIS_API_BASE_URL` pointing at the API
- `semgrep` and `gitleaks` available on `PATH`

## Local development

Use the debug configuration in `/.vscode/launch.json` to start the API and open the extension host together.

## Packaging

Run the packaging script from `apps/extension` to produce a `.vsix` release artifact.
