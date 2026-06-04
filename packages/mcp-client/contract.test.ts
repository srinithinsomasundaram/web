import assert from "node:assert/strict";

import { resolveBuiltServerEntryPoint, resolveServerEntryPoint } from "./client.js";

const serverEntryPoint = resolveServerEntryPoint();
assert.equal(
  serverEntryPoint.endsWith("/apps/mcp-server/src/main.ts"),
  true,
  "MCP client must resolve the server entrypoint, not import server internals"
);

const builtServerEntryPoint = resolveBuiltServerEntryPoint();
assert.equal(
  builtServerEntryPoint.endsWith("/apps/mcp-server/dist/main.js"),
  true,
  "MCP client must target the built MCP server entrypoint at runtime"
);
