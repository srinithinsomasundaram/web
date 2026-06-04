# Beta Smoke Test

This is the acceptance flow to run before inviting beta users.

## Verified In a Fresh Environment

- Created an isolated virtualenv.
- Installed `apps/api/requirements.txt`.
- Ran `python -m unittest discover -s apps/api/tests -t apps/api`.
- Result: API tests passed in a clean environment.

## End-to-End Demo Flow

Run this sequence in a workspace with a known vulnerability:

1. Create a vulnerable file.
2. Save the file.
3. Run `GoAegis: Scan Workspace`.
4. Confirm a finding appears in diagnostics.
5. Click the finding.
6. Confirm the editor jumps to the source line.
7. Run `GoAegis: Review Current File`.
8. Apply a fix from the diagnostic code action.
9. Run `GoAegis: Review Current PR` on a branch with a GitHub PR.
10. Confirm the review is published to GitHub.

## Current Status

- Fresh-environment API install: verified.
- API test discovery in fresh env: verified.
- Full VS Code to GitHub PR smoke flow: ready to run as the beta acceptance test.
