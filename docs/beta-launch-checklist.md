# Beta Launch Checklist

Use this checklist before tagging `v0.1.0-beta` and inviting external users.

## 1. Freeze Scope

- [ ] No new features will be added before beta.
- [ ] Only bug fixes, deployment fixes, and onboarding fixes are allowed.
- [ ] `packages/policy-engine`, `packages/logger`, organizations, billing, and compliance remain out of scope.

## 2. Fresh Environment Validation

- [ ] Create a clean virtualenv or container.
- [ ] Run `pip install -r apps/api/requirements.txt`.
- [ ] Run `python -m unittest discover -s apps/api/tests -t apps/api`.
- [ ] Confirm the API tests pass from a clean machine.

## 3. Build and Typecheck

- [ ] Run `npm run check` at the repository root.
- [ ] Confirm all workspace packages typecheck cleanly.
- [ ] Confirm the extension, MCP server, SDK, and shared types all remain aligned.

## 4. Runtime Dependencies

- [ ] `fastapi` is pinned in `apps/api/requirements.txt`.
- [ ] `uvicorn` is pinned in `apps/api/requirements.txt`.
- [ ] `pydantic` is pinned in `apps/api/requirements.txt`.
- [ ] `semgrep` is installed on the release machine.
- [ ] `gitleaks` is installed on the release machine.
- [ ] `DATABASE_URL` is configured in the deployment environment.
- [ ] `GEMINI_API_KEY` is configured in the backend environment if AI generation is enabled.
- [ ] `GOAEGIS_GITHUB_TOKEN` is configured in the backend environment if PR publishing is enabled.
- [ ] `GOAEGIS_API_BASE_URL` is configured for the extension and MCP client.

## 5. Security Verification

- [ ] Run `gitleaks detect` against the repository.
- [ ] Confirm no Gemini keys, GitHub tokens, or database credentials appear in git history.
- [ ] Confirm telemetry remains anonymous.
- [ ] Confirm telemetry does not include file contents or file paths.

## 6. Beta Smoke Test

- [ ] Create a vulnerable file.
- [ ] Save the file.
- [ ] Run `GoAegis: Scan Workspace`.
- [ ] Confirm a finding appears in diagnostics.
- [ ] Click the finding and jump to source.
- [ ] Run `GoAegis: Review Current File`.
- [ ] Apply a fix from the diagnostic code action.
- [ ] Run `GoAegis: Review Current PR`.
- [ ] Confirm the review is published to GitHub.
- [ ] Confirm the review path uses workspace-relative file paths.

## 7. Product Verification

- [ ] Sidebar shows score, findings, history, and trend.
- [ ] Telemetry summary endpoint returns non-zero counts after use.
- [ ] Landing page is available and matches the beta positioning.
- [ ] Documentation links from README are accurate.

## 8. Release Decision

- [ ] At least one external developer completed the flow.
- [ ] The external developer understood the value quickly.
- [ ] No launch-blocking bugs remain.
- [ ] Tag `v0.1.0-beta`.
- [ ] Freeze feature development.
- [ ] Recruit beta users.
