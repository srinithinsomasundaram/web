import { invokeTool, toolDefinitions } from "./dispatch.js";
import { McpServer } from "./local-mcp.js";

const toolInputSchemas: Record<string, unknown> = {
  securityScan: {
    type: "object",
    properties: {
      projectId: { type: "string" },
      repositoryId: { type: "string" },
      path: { type: "string" },
      ref: { type: "string" }
    },
    required: ["projectId", "repositoryId"]
  },
  securityFix: {
    type: "object",
    properties: {
      projectId: { type: "string" },
      findingId: { type: "string" },
      provider: { type: "string", enum: ["gemini", "openai", "anthropic"] }
    },
    required: ["projectId", "findingId"]
  },
  secretScan: {
    type: "object",
    properties: {
      projectId: { type: "string" }
    },
    required: ["projectId"]
  },
  projectScore: {
    type: "object",
    properties: {
      projectId: { type: "string" }
    },
    required: ["projectId"]
  },
  projectHistory: {
    type: "object",
    properties: {
      projectId: { type: "string" }
    },
    required: ["projectId"]
  },
  githubReview: {
    type: "object",
    properties: {
      projectId: { type: "string" },
      repositoryId: { type: "string" },
      source: { type: "string", enum: ["current-file", "pull-request"] },
      path: { type: "string" },
      title: { type: "string" },
      content: { type: "string" },
      diff: { type: "string" },
      provider: { type: "string", enum: ["gemini", "openai", "anthropic"] }
    },
    required: ["projectId", "repositoryId"]
  },
  githubPullRequestReview: {
    type: "object",
    properties: {
      projectId: { type: "string" },
      repositoryId: { type: "string" },
      owner: { type: "string" },
      repo: { type: "string" },
      pullNumber: { type: "number" },
      headSha: { type: "string" },
      baseSha: { type: "string" },
      source: { type: "string", enum: ["current-file", "pull-request"] },
      path: { type: "string" },
      title: { type: "string" },
      content: { type: "string" },
      diff: { type: "string" },
      provider: { type: "string", enum: ["gemini", "openai", "anthropic"] }
    },
    required: ["projectId", "repositoryId", "owner", "repo", "pullNumber"]
  },
  telemetryEvent: {
    type: "object",
    properties: {
      anonymousId: { type: "string" },
        eventName: {
          type: "string",
          enum: [
            "app_activated",
            "scan_completed",
            "workspace_scan",
            "review_completed",
            "review_generated",
            "review_published",
            "fix_applied",
            "finding_clicked",
            "feature_used"
          ]
        },
      source: { type: "string" },
      properties: { type: "object" }
    },
    required: ["anonymousId", "eventName"]
  }
};

export function createTransportedMcpServer(): McpServer {
  const server = new McpServer(
    { name: "goaegis-mcp-server", version: "1.0.0" },
    {
      instructions:
        "Expose GoAegis security, remediation, secrets, and score tools. Do not add business logic in the transport layer."
    }
  );

  for (const definition of toolDefinitions) {
    server.registerTool(
      definition.name,
      {
        description: definition.description,
        inputSchema: toolInputSchemas[definition.name]
      },
      async (args: unknown) => invokeTool(definition.name, args)
    );
  }

  return server;
}

function parseToolArgs(rawArgs: string[]): { tool: string; payload: unknown } | undefined {
  const toolIndex = rawArgs.indexOf("--tool");
  const argsIndex = rawArgs.indexOf("--args");

  if (toolIndex < 0 || toolIndex + 1 >= rawArgs.length) {
    return undefined;
  }

  const tool = rawArgs[toolIndex + 1];
  const payloadText = argsIndex >= 0 && argsIndex + 1 < rawArgs.length ? rawArgs[argsIndex + 1] : "{}";

  try {
    return { tool, payload: JSON.parse(payloadText) as unknown };
  } catch {
    return { tool, payload: {} };
  }
}

export async function runCliTransportedMcpServer(argv: string[] = process.argv.slice(2)): Promise<void> {
  const invocation = parseToolArgs(argv);
  if (!invocation) {
    return;
  }

  const result = await invokeTool(invocation.tool as Parameters<typeof invokeTool>[0], invocation.payload);
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(result));
}

export async function runStdioTransportedMcpServer(): Promise<void> {
  const bufferState = { buffer: "" };
  const server = createTransportedMcpServer();
  void server;

  process.stdin.setEncoding("utf8");
  process.stdin.on("data", async (chunk: string) => {
    bufferState.buffer += chunk;
    let newlineIndex = bufferState.buffer.indexOf("\n");
    while (newlineIndex >= 0) {
      const rawLine = bufferState.buffer.slice(0, newlineIndex).trim();
      bufferState.buffer = bufferState.buffer.slice(newlineIndex + 1);
      newlineIndex = bufferState.buffer.indexOf("\n");
      if (!rawLine) {
        continue;
      }

      try {
        const message = JSON.parse(rawLine) as { id?: string; tool?: string; args?: unknown };
        if (!message.tool) {
          process.stdout.write(JSON.stringify({ id: message.id ?? null, error: "Missing tool name." }) + "\n");
          continue;
        }

        const response = await invokeTool(message.tool as Parameters<typeof invokeTool>[0], message.args ?? {});
        process.stdout.write(JSON.stringify({ id: message.id ?? null, result: response }) + "\n");
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        process.stdout.write(JSON.stringify({ id: null, error: message }) + "\n");
      }
    }
  });
}
