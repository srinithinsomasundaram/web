# GoAegis Demo Script

Use this script for the first 10 to 20 users.

## Goal

Show the full loop:

1. save a vulnerable file
2. see GoAegis diagnose it
3. open the sidebar and show the score
4. apply a one-click fix
5. run a PR review and show GitHub-ready comments
6. show history and trend improvements

## Suggested Flow

1. Open `apps/extension/test-fixtures/vulnerable.py`.
2. Save the file.
3. Point out the SQL injection diagnostic.
4. Open the GoAegis sidebar and show the current score.
5. Right-click the diagnostic and choose `GoAegis: Fix Vulnerability`.
6. Open `apps/extension/test-fixtures/vulnerable.js`.
7. Save the file and point out the `eval` diagnostic.
8. Run `GoAegis: Review Current File`.
9. If GitHub is configured, run `GoAegis: Review Current PR`.
10. Open the trend/history section and show progress over time.

## Demo Talking Points

- The extension never calls Gemini directly.
- MCP only orchestrates.
- The API owns security and AI logic.
- The UI stays thin and focused.
- Telemetry is anonymous and coarse.

## Exit Criteria

- The user understands the core workflow in under five minutes.
- The user sees a useful diagnostic and a useful fix.
- The user understands how GoAegis helps in PR review, not only in the IDE.
