# GoAegis Landing Page

This folder contains the public-facing GoAegis landing page.

The page is static HTML:

- `apps/dashboard/index.html`
- `apps/dashboard/demo.html`

There is no build step required to view it locally.

## Run Locally

### Option 1: Serve this folder directly

```bash
cd apps/dashboard
python3 -m http.server 4173
```

Open:

```text
http://127.0.0.1:4173/index.html
```

Browser demo:

```text
http://127.0.0.1:4173/demo.html
```

### Option 2: Open the file directly

You can also open `index.html` in any browser if you do not want to run a local server.

## What The Page Is For

The landing page is meant for:

- first-time visitors
- beta recruiting
- demo links
- install and usage positioning

The demo page is meant for:

- showing the developer experience in a browser
- presenting the findings panel and review panel without an extension host
- walking through save, scan, fix, and PR review in a guided flow

## What The Page Communicates

- save-to-scan workflow
- GitHub PR review flow
- one-click fix flow
- project score and trend tracking
- anonymous telemetry
- deployment positioning for the static landing site, backend API, and VS Code extension

## Notes

- The landing page is intentionally static.
- `apps/dashboard/package.json` currently contains placeholder scripts and is not required to run the page.
- If you want to serve the page from the repository root instead, run a static server from the root and browse to `apps/dashboard/index.html`.
- The landing page can be deployed to GitHub Pages, Netlify, Vercel, or any static host without a build step.
