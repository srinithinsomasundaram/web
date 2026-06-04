import assert from "node:assert/strict";

const sourceEntryPoint = decodeURIComponent(
  new URL("../../../apps/mcp-server/src/main.ts", import.meta.url).pathname
);
assert.equal(
  sourceEntryPoint.endsWith("/apps/mcp-server/src/main.ts"),
  true,
  "MCP client must resolve the server entrypoint path shape"
);

const builtEntryPoint = decodeURIComponent(
  new URL("../../../apps/mcp-server/dist/main.js", import.meta.url).pathname
);
assert.equal(
  builtEntryPoint.endsWith("/apps/mcp-server/dist/main.js"),
  true,
  "MCP client must target the built MCP server entrypoint path shape"
);
