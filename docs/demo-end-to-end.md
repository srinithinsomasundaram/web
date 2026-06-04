# GoAegis P0 Demo

The demo path is:

1. Create vulnerable file.
2. Save file.
3. Extension triggers scan.
4. MCP tool dispatches to API.
5. API runs Semgrep and Gitleaks.
6. API returns findings and score.
7. Extension publishes diagnostics.

Vulnerable samples live in:

- `apps/extension/test-fixtures/vulnerable.py`
- `apps/extension/test-fixtures/vulnerable.js`

The scripted demo entrypoint is:

- `apps/extension/src/demo/e2eDemo.ts`

