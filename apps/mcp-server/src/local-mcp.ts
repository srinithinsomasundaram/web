export interface McpServerInfo {
  name: string;
  version: string;
}

export interface ToolConfig {
  description: string;
  inputSchema?: unknown;
  outputSchema?: unknown;
}

export interface StdioTransport {
  kind: "stdio";
}

export class StdioServerTransport implements StdioTransport {
  kind = "stdio" as const;
}

export class McpServer {
  private readonly tools = new Map<string, { config: ToolConfig; handler: (args: unknown) => Promise<unknown> | unknown }>();

  constructor(private readonly info: McpServerInfo, private readonly options?: { instructions?: string }) {
    void info;
    void options;
  }

  registerTool(name: string, config: ToolConfig, handler: (args: unknown) => Promise<unknown> | unknown): void {
    this.tools.set(name, { config, handler });
  }

  async connect(transport: StdioTransport): Promise<void> {
    void transport;
    void this.info;
    void this.options;
    // Placeholder transport loop. The tool registry is exposed through invokeTool in the monorepo.
  }
}

