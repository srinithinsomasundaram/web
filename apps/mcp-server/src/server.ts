import { invokeTool, toolDefinitions } from "./dispatch.js";
import type { MCPToolDefinition } from "./types.js";

export function createMCPServer(): {
  toolDefinitions: MCPToolDefinition[];
  invokeTool: typeof invokeTool;
} {
  return {
    toolDefinitions,
    invokeTool
  };
}
