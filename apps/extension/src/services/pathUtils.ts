import { relative } from "node:path";

export function toWorkspaceRelativePath(workspaceRoot: string, absolutePath: string): string {
  const normalized = relative(workspaceRoot, absolutePath);
  if (!normalized || normalized.startsWith("..")) {
    return absolutePath;
  }

  return normalized;
}
