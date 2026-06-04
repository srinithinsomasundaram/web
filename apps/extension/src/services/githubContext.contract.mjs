import assert from "node:assert/strict";

function toWorkspaceRelativePath(workspaceRoot, absolutePath) {
  const rootPrefix = workspaceRoot.endsWith("/") ? workspaceRoot : `${workspaceRoot}/`;
  return absolutePath.startsWith(rootPrefix) ? absolutePath.slice(rootPrefix.length) : absolutePath;
}

const relativePath = toWorkspaceRelativePath("/workspace/repo", "/workspace/repo/src/auth.ts");
assert.equal(relativePath, "src/auth.ts");

const fallbackPath = toWorkspaceRelativePath("/workspace/repo", "/other/location/auth.ts");
assert.equal(fallbackPath, "/other/location/auth.ts");
