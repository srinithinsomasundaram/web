import assert from "node:assert/strict";

import { toWorkspaceRelativePath } from "./pathUtils.js";

const relativePath = toWorkspaceRelativePath("/workspace/repo", "/workspace/repo/src/auth.ts");
assert.equal(relativePath, "src/auth.ts");

const fallbackPath = toWorkspaceRelativePath("/workspace/repo", "/other/location/auth.ts");
assert.equal(fallbackPath, "/other/location/auth.ts");
