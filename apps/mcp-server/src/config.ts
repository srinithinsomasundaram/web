export interface MCPConfig {
  apiBaseUrl: string;
}

export const config: MCPConfig = {
  apiBaseUrl: process.env.GOAEGIS_API_BASE_URL ?? "http://localhost:8000"
};
