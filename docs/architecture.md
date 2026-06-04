# GoAegis Architecture

This repository keeps the layers separated so future scanners, AI providers, and policy gates can plug in without rewriting the platform.

## Request Flow

1. VS Code extension saves a file.
2. Extension calls the MCP server.
3. MCP server orchestrates API calls only.
4. API routes call services.
5. Services coordinate scanners, AI, scoring, and policy checks.

