import { runCliTransportedMcpServer, runStdioTransportedMcpServer } from "./transport.js";

async function main(): Promise<void> {
  const maybeTool = process.argv.includes("--tool");
  if (maybeTool) {
    await runCliTransportedMcpServer();
    return;
  }

  await runStdioTransportedMcpServer();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error);
    // eslint-disable-next-line no-console
    console.error(`[goaegis-mcp-server] ${message}`);
    process.exit(1);
  });
}
