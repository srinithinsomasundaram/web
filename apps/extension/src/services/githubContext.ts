import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

import * as vscode from "vscode";

import { toWorkspaceRelativePath } from "./pathUtils.js";

export interface GitHubWorkspaceContext {
  owner?: string;
  repo?: string;
  pullNumber?: number;
  headSha?: string;
  baseSha?: string;
  branch?: string;
  relativePath?: string;
}

function runGit(args: string[], cwd: string): { stdout: string; stderr: string; status: number | null } {
  const result = spawnSync("git", args, {
    cwd,
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024
  });

  if (result.error) {
    return { stdout: "", stderr: result.error.message, status: 1 };
  }

  return {
    stdout: result.stdout.trim(),
    stderr: result.stderr.trim(),
    status: result.status
  };
}

function parseGitHubRemote(remoteUrl: string): { owner: string; repo: string } | undefined {
  const sshMatch = remoteUrl.match(/^git@github\.com:([^/]+)\/(.+?)(?:\.git)?$/);
  if (sshMatch) {
    return {
      owner: sshMatch[1],
      repo: sshMatch[2].replace(/\.git$/, "")
    };
  }

  const httpsMatch = remoteUrl.match(/^https?:\/\/github\.com\/([^/]+)\/(.+?)(?:\.git)?$/);
  if (httpsMatch) {
    return {
      owner: httpsMatch[1],
      repo: httpsMatch[2].replace(/\.git$/, "")
    };
  }

  return undefined;
}

function detectPullRequestWithGh(cwd: string): Partial<GitHubWorkspaceContext> {
  const result = runGit(["branch", "--show-current"], cwd);
  const branch = result.stdout;
  if (!branch) {
    return {};
  }

  const ghResult = spawnSync("gh", ["pr", "view", "--json", "number,headRefOid,baseRefOid"], {
    cwd,
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024
  });
  if (ghResult.error || ghResult.status !== 0 || !ghResult.stdout.trim()) {
    const branchMatch = branch.match(/(?:pr|pull|pr-)[/-]?(\d+)/i) ?? branch.match(/^(\d+)$/);
    return branchMatch ? { pullNumber: Number.parseInt(branchMatch[1], 10), branch } : { branch };
  }

  try {
    const parsed = JSON.parse(ghResult.stdout) as { number?: number; headRefOid?: string; baseRefOid?: string };
    return {
      pullNumber: typeof parsed.number === "number" ? parsed.number : undefined,
      headSha: typeof parsed.headRefOid === "string" ? parsed.headRefOid : undefined,
      baseSha: typeof parsed.baseRefOid === "string" ? parsed.baseRefOid : undefined,
      branch
    };
  } catch {
    const branchMatch = branch.match(/(?:pr|pull|pr-)[/-]?(\d+)/i) ?? branch.match(/^(\d+)$/);
    return branchMatch ? { pullNumber: Number.parseInt(branchMatch[1], 10), branch } : { branch };
  }
}

export async function detectGitHubWorkspaceContext(document: vscode.TextDocument): Promise<GitHubWorkspaceContext> {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  if (!workspaceFolder) {
    return {};
  }

  const cwd = resolve(workspaceFolder.uri.fsPath);
  const absolutePath = document.uri.fsPath;

  const remoteResult = runGit(["remote", "get-url", "origin"], cwd);
  const remote = parseGitHubRemote(remoteResult.stdout);
  const pullRequestContext = detectPullRequestWithGh(cwd);

  return {
    owner: remote?.owner,
    repo: remote?.repo,
    relativePath: toWorkspaceRelativePath(cwd, absolutePath),
    ...pullRequestContext
  };
}
